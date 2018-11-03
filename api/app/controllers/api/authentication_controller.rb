class Api::AuthenticationController < ApplicationController
  include TokenOps
  GITHUB_CLIENT_SECRET = File.read("/run/secrets/github_client_secret")

  def github
    code = params[:code]
    github = Github.new client_id: ENV["GITHUB_CLIENT_ID"], client_secret: GITHUB_CLIENT_SECRET
    token = github.get_token(code).token
    
    github_users = Github::Client::Users.new oauth_token: token
    user = User.create_or_fetch(github_users.get)
    jwt = TokenOps.encode_short(user)
    
    redirect_to "#{ENV["CLIENT_URL"]}/auth/#{jwt}"
  end

  def show
    token = params[:token]
    user_id = TokenOps.decode(token)[0]["id"]
    user = User.find(user_id)
    long_token = TokenOps.encode_long(user)
    
    render json: user.fsa(long_token), status: 200
  end
end