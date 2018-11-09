module Helpers
  def request_as(user, exp = 25.hours.from_now, term = "LONG")
   return {"Authorization" => TokenOps.encode(exp, user, term) }
  end
end