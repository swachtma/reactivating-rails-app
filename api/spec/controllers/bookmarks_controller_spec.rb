require 'rails_helper'

RSpec.describe BookmarksController, type: :controller do
  before(:each) do
    @user = User.create(github_id: 1, github_email: "someone", username: "someoneelse", avatar: "someimage")
    @user.bookmark = Bookmark.create(last_read: 1, furthest_read: 1)
    request.headers.merge! request_as(@user)
  end
  
  describe "post #create" do
    it "returns http successfor numeric chapter_id" do
      post :create, params: {chapter_id: 2}
      expect(response).to be_successful
      @user.reload
      expect(@user.bookmark.last_read).to eq 2
      expect(@user.bookmark.furthest_read).to eq 2
    end
    
    it "returns an error on non-numeric chapter_id" do
      post :create, params: {chapter_id: "badvalue"}
      expect(JSON.parse(response.body)["type"]).to eq "ERROR|FAILURE"
    end
  end
  
  describe "GET #idex" do
    it "returns a user bookmark if available" do
      get :index
      expect(response).to be_successful
      expect(response.body).to eq "{\"user_id\":#{@user.id},\"last_read\":1,\"furthest_read\":1}"
    end
    
    it "returns a silent error if no bookmark is available" do
      @user.bookmark.destroy
      get :index
      expect(response).to be_successful
      expect(JSON.parse(response.body)["type"]).to eq "ERROR|FAILURE"
    end
  end
end 