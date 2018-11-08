class BaseException < StandardError
  include ActiveModel::Serialization
  attr_reader :status, :code, :message

  ERROR_DESCRIPTION = Proc.new {|code, message| {status: "ERROR|FAILURE", code: code, message: message}}
  ERROR_CODE_MAP = {
    "BookmarkErrors::BookmarkUnavailable" =>
      ERROR_DESCRIPTION.call(200, "No bookmarks were available at login, skipping bookmark prompt."),
    "BookmarkErrors::BookmarkChapterInvalid" =>
      ERROR_DESCRIPTION.call(500, "Bookmark update failed, chapter was invalid."),
    "ChapterErrors::ChaptersUnavailable" =>
      ERROR_DESCRIPTION.call(500, "Unable to load book's chapters."),
    "NodeErrors::NodesUnavailable" =>
      ERROR_DESCRIPTION.call(500, "Unable to load the book's content nodes."),
    "AuthenticationErrors::GithubFailure" =>
      ERROR_DESCRIPTION.call(500, "We are unable to communicate with Github to complete your sign-in.  Please try again later."),
    "AuthenticationErrors::BadToken" =>
      ERROR_DESCRIPTION.call(500, "Your session has expired or is no longer valid, please sign in again.")
  }

  def initialize(e = nil)
    error_type = self.class.name
    BaseException::ERROR_CODE_MAP
      .fetch(error_type, {}).each do |attr, value|
        instance_variable_set("@#{attr}".to_sym, value)
    end
  end
end