require 'rails_helper'
require 'book_file_finder'
 
RSpec.describe BookFileFinder do
  it "removes readme.md, directories, and non-md files from return" do
    path = "spec/lib/testbook/"
    entries = BookFileFinder.new(path).entries
    expect(entries.length).to eq 2
    expect(entries[0]).to eq path+"mockChapter.md"
  end
  
  it "enforces proper file path" do
    path = "spec/lib/testbook/"
    bad_path = "spec/lib/testbook"
    expect(BookFileFinder.new(path).entries).to eq \
      BookFileFinder.new(bad_path).entries
  end
end