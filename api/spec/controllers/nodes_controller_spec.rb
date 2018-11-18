RSpec.describe Api::NodesController, type: :controller do
  describe "GET #idex" do
    it "returns nodes if available" do
      chapter = Chapter.create(title: "test run")
      chapter.nodes.create(node_type: "paragraph", content: "hello world")
      get :index
      expect(response).to be_successful
      expect(JSON.parse(response.body)[0]["content"]).to eq "hello world"
    end
    
    it "raises error if node unavailable" do
      get :index
      expect(JSON.parse(response.body)["type"]).to eq "ERROR|FAILURE"
    end
  end
end 