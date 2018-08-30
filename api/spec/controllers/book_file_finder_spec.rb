require 'rails_helper'
RSpec.describe BookFileFinder do
  it "removes readme.md, directories, and non-md files from return" do
    path = "spec/controllers/concerns/testbook/"
    entries = BookFileFinder.new(path).entries
    expect(entries.length).to eq 1
    expect(entries[0]).to eq path+"mockChapter.md"
  end
  
  it "enforces proper file path" do
    path = "spec/controllers/concerns/testbook/"
    bad_path = "spec/controllers/concerns/testbook"
    expect(BookFileFinder.new(path).entries).to eq BookFileFinder.new(bad_path).entries
  end
end