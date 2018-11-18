class ChaptersController < ApplicationController
  def index
    payload = Chapter.all.fsa
    raise ChapterErrors::ChaptersUnavailable if payload.empty?
    render json: payload, status: 200
  end
end
