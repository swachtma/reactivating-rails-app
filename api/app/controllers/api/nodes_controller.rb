class Api::NodesController < ApplicationController
  def index
    payload = Node.all.fsa
    render json: payload, status: 200
  end
end