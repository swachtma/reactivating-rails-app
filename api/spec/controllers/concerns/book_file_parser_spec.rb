require 'rails_helper'

RSpec.describe BookFileParser do
  it "creates payload of top-level blocks from array of MD files" do
    payload = BookFileParser.new(["spec/controllers/concerns/testbook/mockChapter.md"]).payload
    expect(payload.length).to eq 13
  end
end