class Api::BookmarksController < ApplicationController
  before_action :authenticate_request!, only: [:index, :create]
  
  def index
    if(bm = @current_user.bookmark)
      render json: bm.fsa, status: 200
    else
      raise ActiveRecord::RecordNotFound
    end
  end
  
  def create
    ch_id = params[:chapter_id]
    
    bookmark = Bookmark.find_or_initialize_by(user_id: @current_user.id)
    bookmark.update(last_read: ch_id, furthest_read: ch_id)
    render json: {message: "Bookmarks added, using chapter key #{ch_id}"}, status: 200
  end
end