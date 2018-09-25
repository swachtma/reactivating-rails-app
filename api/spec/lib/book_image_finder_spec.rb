require 'rails_helper'
require 'book_image_finder'

RSpec.describe BookImageFinder do
  it "removes files, and relative DIR paths from entries" do
    path = "spec/lib/testbook/"
    entries = BookImageFinder.new(path).entries
    expect(entries.length).to eq 1
    expect(entries[0]).to eq "images"
  end
  
  it "enforces proper file path" do
    path = "spec/lib/testbook/"
    bad_path = "spec/lib/testbook"
    expect(BookImageFinder.new(path).entries).to \
      eq BookImageFinder.new(bad_path).entries
  end
end