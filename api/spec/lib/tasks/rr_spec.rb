require 'rails_helper'
require 'rake'

describe "Rake Task" do
  describe "task rr:clear_book" do
    before :each do
      user = User.create(
        github_email: "test@gmail.com",
        github_id: 1,
        username: "test_user",
        avatar: "someimage.gif"
      )
      chapter = Chapter.create(title: "test chapter")
      node = Node.create(chapter_id: chapter.id, node_type: "paragraph", content: "hello world")
      bookmark = Bookmark.create(user_id: user.id, last_read: chapter.id, furthest_read: chapter.id)
  
      Rake.application.rake_require "tasks/rr"
      Rake::Task.define_task(:environment)
      Rake::Task["rr:clear_book"].reenable
      Rake.application.invoke_task "rr:clear_book"
    end

    it "empties chapter and nodes tables but preserves all other" do
      expect(User.all).not_to be_empty
      expect(Bookmark.all).not_to be_empty
      expect(Chapter.all).to be_empty
      expect(Node.all).to be_empty
    end

    it "resets index values for Chapter and Node tables" do
      chapter = Chapter.create(title: "test chapter")
      node = Node.create(chapter_id: chapter.id, node_type: "paragraph", content: "hello world")

      expect(chapter.id).to eq 1
      expect(node.id).to eq 1
    end
  end
end