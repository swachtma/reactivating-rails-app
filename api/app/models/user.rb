# == Schema Information
#
# Table name: users
#
#  id           :integer          not null, primary key
#  github_id    :integer
#  github_email :string
#  username     :string
#  avatar       :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class User < ApplicationRecord
  has_one :bookmark
  
 def fsa(token, expires)
    {
      id: id,
      github_email: github_email,
      username: username,
      avatar: avatar,
      token: token,
      expires: expires
    }
  end
  
  def self.create_or_fetch(user)
    find_by(github_id: user.id) || create(
      github_id: user.id,
      github_email: user.email,
      username: user.login,
      avatar: user.avatar_url
    )
  end
end