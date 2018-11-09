# == Schema Information
#
# Table name: users
#
#  id           :integer          not null, primary key
#  github_id    :integer
#  github_email :string
#  username     :string
#  avatar       :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'rails_helper'

RSpec.describe User, type: :model do
  before(:each) do
    @user = User.create({
        github_id: 2,
        github_email: "test@test.com",
        username:"something_witty",
        avatar:"someimage.gif",
      })
  end
  
  it "provides .fsa(token) to produce user FSA response object" do
   fsa = @user.fsa("sometoken", 200000)
   expect(fsa[:username]).to eq @user.username
   expect(fsa[:token]).to eq "sometoken"
  end
  
  describe "create_or_fetch" do
    it "creates a new user if one cannot be found" do
      User.create_or_fetch(OpenStruct.new({
        id: 1,
        email: "someone",
        username: "someoneelse",
        avatar: "someimage"
      }))
      
      expect(User.all.count).to eq 2
    end
    
    it "returns a recond by github_id if available" do
      requested_user = User.create_or_fetch(OpenStruct.new({id: 2}))
      expect(requested_user).to eq @user
      expect(User.all.count).to eq(1)
    end
  end
end