require 'rails_helper'
require 'chapter_file.rb'

RSpec.describe ChapterFile do
  it "invalidates chapters without titles/headings" do
    chapter_test = ChapterFile.new(
      "spec/lib/testbook/invalidChapter.md"
    ).invalid?
    expect(chapter_test).to be_truthy
  end
  
  describe "valid chapters" do
    before(:each) do
      @chapter = chapter = ChapterFile.new("spec/lib/testbook/mockChapter.md")
    end
    
    it "have headings/titles" do
      expect(@chapter.invalid?).to be_falsey
    end
    
    it "create model instances when saved." do
      @chapter.save
      expect(Chapter.all.count).to eq(1)
    end
  end
end