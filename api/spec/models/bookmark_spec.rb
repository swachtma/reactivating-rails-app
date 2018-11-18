# == Schema Information
#
# Table name: bookmarks
#
#  id            :integer          not null, primary key
#  last_read     :integer
#  furthest_read :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  user_id       :integer
#

require 'rails_helper'

RSpec.describe Bookmark, type: :model do
  describe("Bookmark #ensure_furthest_location") do
    before(:each) do  
      @user = User.create(github_id: 1, github_email: "someone", username: "someoneelse", avatar: "someimage")
      @bm = @user.bookmark = Bookmark.create(last_read: 2, furthest_read: 2)
    end
    
    it "updates furthest_read if number increases" do
      @bm.update(furthest_read: 3, last_read: 3)
      expect(@bm.furthest_read).to eq 3
      expect(@bm.last_read).to eq 3
    end
    
    it "ignores furthest_read updates if they are decreases" do
      @bm.update(furthest_read: 1, last_read: 1)
      expect(@bm.furthest_read).to eq 2
      expect(@bm.last_read).to eq 1
    end
  end
end
