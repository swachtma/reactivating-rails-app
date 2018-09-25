class BookImageFinder
    attr_reader :entries
    
    def initialize(path)
       @path = normalize_folder(path) 
       @entries = filter_image_dirs(Dir.entries(@path))
    end
    
    def copy_files_to_public
      entries.each do |file_name|
        file_path = expand_file_path(file_name)
        FileUtils.cp_r(file_path,"#{Rails.root}/public/")
      end
    end
    
    private
      def normalize_folder(path)
        path[-1] == "/" ? path : path + "/"
      end
      
      def filter_image_dirs(raw_file_list)
          raw_file_list.select do |file|
              file_path = expand_file_path(file)
              Dir.exists?(file_path) && file != "." \
                && file != ".." && file != ".git"
          end
      end
      
      def expand_file_path(file_name)
          @path + file_name
      end
  end