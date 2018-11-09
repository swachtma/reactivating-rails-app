require 'rails_helper'

RSpec.describe TokenOps do
    it "provides an encode and decode method" do
      expect(TokenOps.respond_to? :encode).to be true
      expect(TokenOps.respond_to? :decode).to be true
    end
    
    describe "encode" do
      before(:each) do
        @user = User.create({
          github_id: "test",
          github_email: "test@test.com",
          username:"something_witty",
          avatar:"someimage.gif",
        })
      end
      
      describe "defaults" do
        before(:each) do
          token = TokenOps.encode(2.minutes.from_now, @user)
          @decoded = TokenOps.decode(token)[0]
        end
        
        it "provide an id value and expiration when decoded" do
          expect(@decoded["id"]).not_to be_nil
          expect(@decoded["exp"]).not_to be_nil
        end
        
        it "default to SHORT type, if not specified" do
          expect(@decoded["type"]).to eq "SHORT"
        end
      end
      
      describe "explicit LONG" do
        it "can be decoded" do
          token = TokenOps.encode(30.days.from_now, @user)
          decoded = TokenOps.decode(token)[0]
          expect(decoded["exp"]).not_to be_nil
        end
      end
  end
end