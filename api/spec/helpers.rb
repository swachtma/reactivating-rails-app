module Helpers
  def request_as(user)
    return {"Authorization" => TokenOps.encode_long(user) }
  end
end