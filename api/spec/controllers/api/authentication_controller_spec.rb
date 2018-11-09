require 'rails_helper'

RSpec.describe Api::AuthenticationController, type: :controller do
  describe "GET #github" do
    let(:sample_response) { OpenStruct.new({id: 1, email: "", login: "", avatar_url: ""}) }
   
    before(:each) do
      #create a stub for main Github API class.  Stub is then allowed to respond to 
      # .get_token(code).token chain of our controller with a fake token.
      github = double("github")
      class_double("Github", :new => github).as_stubbed_const(:transfer_nested_constants => true)
      allow(github).to receive_message_chain(:get_token, :token) { "fake token" }
      
      #Similar to above we mock the Client::Users class then allow the returned double
      #github_users to respond to #get with a mocked user profile response.
      @github_users = double("@github_users")
      allow(Github::Client::Users).to receive(:new) { @github_users }
      allow(@github_users).to receive(:get) { sample_response }
    end
    
    it "returns http success for new users" do
      get :github
      expect(response).to have_http_status(302)
    end
    
    it "returns http success for existing users" do
      User.create(github_id: 1, github_email: "someone", username: "someoneelse", avatar: "someimage")
      get :github
      expect(response).to have_http_status(302)
    end
  end
  
  describe "GET #show" do
    before(:each) do
      @user = User.create(github_id: 1, github_email: "someone", username: "someoneelse", avatar: "someimage")
      @token = TokenOps.encode(2.minutes.from_now, @user)
    end
      
    it "returns a user profile on valid SHORT token" do
      get :show, params: {:token => @token}
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)).to include("id","username","github_email","token","avatar","expires")
    end
    
    it "updates expiration if token is type == SHORT" do
      get :show, params: {:token => @token}
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)["expires"]).to be > 2.days.from_now.to_i - Time.now.to_i
    end
    
    it "does not update expiration if type == LONG" do
      get :show, params: {:token => TokenOps.encode(14.days.from_now, @user, "LONG")}
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)["expires"]).to be < 15.day.from_now.to_i
    end
    
    it "raises AuthenticationErrors::BadToken if expiration < 12 hours" do
      get :show, params: {:token => TokenOps.encode(11.hours.from_now, @user, "LONG")}
      expect(response).to have_http_status(500)
      expect(JSON.parse(response.body)["type"]).to eq "ERROR|FAILURE"
    end
  end
end 