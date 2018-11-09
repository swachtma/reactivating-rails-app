module TokenOps
  extend ActiveSupport::Concern
  JWT_SECRET = File.read("/run/secrets/jwt_secret")

  def self.encode(expires, user, type = "SHORT")
    payload = {
      iss: ENV['CLIENT_URL'],
      id: user.id,
      type: type,
      exp: expires.to_i,
      iat: Time.now.to_i
    }
    JWT.encode payload, JWT_SECRET, 'HS256'
  end

  def self.decode(token)
    options = {
      iss: ENV['CLIENT_URL'],
      verify_iss: true,
      verify_iat: true,
      leeway: 30,
      algorithm: 'HS256'
    }
    JWT.decode token, JWT_SECRET, true, options
  end
end