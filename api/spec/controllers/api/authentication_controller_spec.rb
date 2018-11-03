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
    
    it "redirects new users to client" do
      get :github
      expect(response).to have_http_status(302)
    end
    
    it "redirects existing users to client" do
      User.create(github_id: 1, github_email: "someone", username: "someoneelse", avatar: "someimage")
      get :github
      expect(response).to have_http_status(302)
    end
  end
  
  describe "GET #show" do
    it "returns a user profile" do
      user = User.create(github_id: 1, github_email: "someone", username: "someoneelse", avatar: "someimage")
      token = TokenOps.encode_short(user)
      
      get :show, params: {:token => token}
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)).to include("id","username","github_email","token","avatar")
    end
  end
end 
