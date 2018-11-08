class BookmarkErrors < BaseException
  class BookmarkUnavailable < BookmarkErrors
  end
  
  class BookmarkChapterInvalid < BookmarkErrors
  end
end