require 'rails_helper'
require 'book_file_parser'

RSpec.describe BookFileParser do
  it "creates payload of top level blocks from array of MD files" do
    payload = BookFileParser.new(["spec/lib/testbook/mockChapter.md"]).payload
    expect(payload.length).to eq 13
  end
end