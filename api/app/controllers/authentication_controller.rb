class AuthenticationController < ApplicationController
  include TokenOps
  GITHUB_CLIENT_ID = File.read("/run/secrets/github_client_id")
  GITHUB_CLIENT_SECRET = File.read("/run/secrets/github_client_secret")

  def github
    begin
      code = params[:code]
      bounce_path = ERB::Util.url_encode(params[:bounce_path])
      github = Github.new client_id: GITHUB_CLIENT_ID, client_secret: GITHUB_CLIENT_SECRET
      token = github.get_token(code).token
      
      github_users = Github::Client::Users.new oauth_token: token
      user = User.create_or_fetch(github_users.get)
      jwt = TokenOps.encode(2.minutes.from_now.to_i, user, "SHORT")
      
      redirect_to "#{ENV["CLIENT_URL"]}/auth/#{jwt}/#{bounce_path}", status: 302
    rescue
      redirect_to "#{ENV["CLIENT_URL"]}/auth/githubfailure/#{bounce_path}"
    end
  end
  
  def show
    begin 
      token = params[:token]
      decoded_token = TokenOps.decode(token)[0]
      expires = decoded_token["exp"]
      user = User.find(decoded_token["id"])
      
      if(decoded_token["type"] == "SHORT")
        expires = 30.days.from_now.to_i
        token = TokenOps.encode(expires, user, "LONG")
      end

      countdown = (expires - Time.now.to_i)
      raise AuthenticationErrors::BadToken if countdown < 12 * 60 * 60
      
      render json: user.fsa(token, countdown), status: 200
    rescue
      raise token == "githubfailure" ? AuthenticationErrors::GithubFailure : AuthenticationErrors::BadToken
    end
  end
end