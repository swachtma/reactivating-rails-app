class Api::ChaptersController < ApplicationController
  def index
    payload = Chapter.all.fsa
    render json: payload, status: 200
  end
end