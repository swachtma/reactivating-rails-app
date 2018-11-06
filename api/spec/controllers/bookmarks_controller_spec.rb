require 'rails_helper'

RSpec.describe Api::BookmarksController, type: :controller do
extend Helpers
  before(:each) do
    @user = User.create(github_id: 1, github_email: "someone", username: "someoneelse", avatar: "someimage")
    @user.bookmark = Bookmark.create(last_read: 1, furthest_read: 1)
    request.headers.merge! request_as(@user)
  end
  
  describe "post #create" do
    it "returns http success and sets new bookmarks" do
      post :create, params: {chapter_id: 2}
      expect(response).to have_http_status(:success)
      @user.reload
      expect(@user.bookmark.last_read).to eq 2
      expect(@user.bookmark.furthest_read).to eq 2
    end
  end
  
  describe "GET #idex" do
    it "returns a user's bookmarks" do
      get :index
      expect(response).to have_http_status(:success)
      expect(response.body).to eq "{\"user_id\":#{@user.id},\"last_read\":1,\"furthest_read\":1}"
    end
  end
end 