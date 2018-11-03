
module TokenOps extend ActiveSupport::Concern
  JWT_SECRET = File.read("/run/secrets/jwt_secret")

  def self.encode_short(user)
    short_payload = token_payload(2.minutes.from_now.to_i, user)
    JWT.encode short_payload, JWT_SECRET, 'HS256'
  end
  
  def self.encode_long(user)
    long_payload = token_payload(30.days.from_now.to_i, user)
    JWT.encode long_payload, JWT_SECRET, 'HS256'
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

  private
    def self.token_payload(expires, user)
      {
        iss: ENV['CLIENT_URL'],
        id: user.id,
        exp: expires,
        iat: Time.now.to_i
      }
    end
end