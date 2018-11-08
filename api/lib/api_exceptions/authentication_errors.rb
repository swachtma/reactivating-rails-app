class AuthenticationErrors < BaseException
  class GithubFailure < AuthenticationErrors
  end
  
  class BadToken < AuthenticationErrors
  end
end