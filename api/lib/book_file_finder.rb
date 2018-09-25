class BookFileFinder
  attr_reader :entries
  
  def initialize(path)
     @path = normalize_folder(path) 
     @entries = locate_chapter_files.sort_by! {|x| File.basename(x,".md").to_i}
  end
  
  private
    def normalize_folder(path)
      path[-1] == "/" ? path : path + "/"
    end
    
    def locate_chapter_files
       raw_file_list = expand_file_paths(Dir.entries(@path))
       filter_chapter_files(raw_file_list);
    end
    
    def filter_chapter_files(raw_file_list)
        raw_file_list.select do |file|
            File.file?(file) && \
            File.extname(file) == ".md" && \
            !/readme\.md/i.match?(file)
        end
    end
    
    def expand_file_paths(file_array)
      # Array.map allows us to iterate through the array
      # updating each by concatenating the directory path onto the file name
      file_array.map do |file|
        @path + file
      end
    end
end