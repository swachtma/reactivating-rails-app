RSpec.describe ChaptersController, type: :controller do
  describe "GET #idex" do
    it "returns nodes if available" do
      Chapter.create(title: "test run")
      get :index
      expect(response).to be_successful
      expect(JSON.parse(response.body)[0]["title"]).to eq "test run"
    end
    
    it "raises error if node unavailable" do
      get :index
      expect(JSON.parse(response.body)["type"]).to eq "ERROR|FAILURE"
    end
  end
end 