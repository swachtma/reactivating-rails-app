class Api::NodesController < ApplicationController
  def index
    payload = Node.all.fsa
    raise NodeErrors::NodesUnavailable if payload.empty?
    render json: payload, status: 200
  end
end