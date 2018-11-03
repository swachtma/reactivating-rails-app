require 'rails_helper'

RSpec.describe TokenOps do
  describe "encode" do
    it "provides an encode short and long  function" do
      expect(TokenOps.respond_to? :encode_short).to be true
      expect(TokenOps.respond_to? :encode_long).to be true
    end
    
    it "can decode a user's id" do
      user = User.create({
        github_id: "test",
        github_email: "test@test.com",
        username:"something_witty",
        avatar:"someimage.gif",
      })
      
      token = TokenOps.encode_short user
      decoded_id = TokenOps.decode(token)[0]["id"]
      expect(decoded_id).to eq user.id
    end
  end
end