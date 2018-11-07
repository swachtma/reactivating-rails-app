class ApplicationController < ActionController::API
  rescue_from BaseException, 
    :with => :render_error_response
    
  def authenticate_request!
      fail StandardError unless user_id_in_token?
      @current_user = User.find(@decoded_token["id"])
  end
  
  private
    def render_error_response(error)
      render json: {name: error, message: error.message, status: error.code}, status: error.code
    end
  
    # Decode the authorization header token and return the payload
    def user_id_in_token?
      auth_token && decoded_token && @decoded_token["id"]
    end
    
    def decoded_token
      @decoded_token ||= TokenOps.decode(auth_token)[0]
    end
  
    def auth_token
      @http_auth_token ||= request.headers['Authorization']
    end
end