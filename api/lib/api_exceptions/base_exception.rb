class BaseException < StandardError
  include ActiveModel::Serialization
  attr_reader :status, :code, :message

  ERROR_DESCRIPTION = Proc.new {|code, message| {status: "ERROR|FAILURE", code: code, message: message}}
  ERROR_CODE_MAP = {
    "BookmarkErrors::BookmarkUnavailable" =>
      ERROR_DESCRIPTION.call(200, "No bookmarks were available at login, skipping bookmark prompt."),
  }

  def initialize
    error_type = self.class.name
    BaseException::ERROR_CODE_MAP
      .fetch(error_type, {}).each do |attr, value|
        instance_variable_set("@#{attr}".to_sym, value)
    end
  end
end