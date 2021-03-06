class ChapterFile
  attr_reader :title, :body, :record
  
  def initialize(file)
    @file_path = file
    @body = CommonMarker.render_doc(File.read(file))
  end
  
  public
    def save
      unless self.invalid?
        puts "Creating chapter: #{@record.title}" unless ENV["RAILS_ENV"] = "test"
        @record.save
      end
    end
    
    def invalid?
      @body.each do |node|
        if node.type == :header
          @record = Chapter.new(title: node.to_plaintext.strip)
          return false
        end
      end
      puts "#{@file_path} removed as invalid chapter; ensure file has at least one heading." unless ENV["RAILS_ENV"] = "test"
      return true
    end
end