class BookFileParser
  attr_reader :payload
  
  def initialize(files_array)
    @files_array = files_array
    @payload = []
    parse_chapter_files
  end
  
  def parse_chapter_files
    @files_array.each do |file|
      raw_doc = File.read(file)
      md_doc = CommonMarker.render_doc(raw_doc)
      md_doc.each do |node|
        @payload.push(node.to_commonmark)
      end
    end
  end
end