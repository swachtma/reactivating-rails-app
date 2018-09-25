require "#{Rails.root}/lib/book_file_finder"
require "#{Rails.root}/lib/book_image_finder"
require "#{Rails.root}/lib/chapter_file"

namespace :rr do
  desc "Import content at lib/reactivating-rails/"
  task load_book: :environment do
    puts "Loading book content..."
    book_path = "#{Rails.root}/lib/reactivating-rails"
    entries = BookFileFinder.new(book_path).entries
    images = BookImageFinder.new(book_path)
    
    puts "Copying image files to public/images..."
    images.copy_files_to_public

    
    entries.delete_if do |file|
      ChapterFile.new(file).invalid?
    end
    
    entries.each do |file|
      chapter = ChapterFile.new(file)
      chapter.save
      
      chapter.body.each do |node|
        chapter.record.nodes.create(
          node_type: node.type.to_s, content: node.to_commonmark
        )
      end
    end
  end

  desc "Clear content of previously loaded iterations"
  task clear_book: :environment do
    puts "Clearing book content..."
  end
end