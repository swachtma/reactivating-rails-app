class Api::BooksController < ApplicationController
  def index
    file_list = BookFileFinder.new("lib/reactivating-rails/").entries
    payload = BookFileParser.new(file_list).payload
    render json: {payload: payload}, status: 200
  end
end