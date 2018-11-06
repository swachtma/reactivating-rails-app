# == Schema Information
#
# Table name: bookmarks
#
#  id            :integer          not null, primary key
#  last_read     :integer
#  furthest_read :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  user_id       :integer
#

class Bookmark < ApplicationRecord
  belongs_to :user
  before_save :ensure_furthest_location
  
  def fsa
    {user_id: user_id, last_read: last_read, furthest_read: furthest_read}
  end
  
  def ensure_furthest_location
    if(bm = Bookmark.where(user_id: self.user_id).first)
      self.furthest_read = bm.furthest_read unless self.furthest_read > bm.furthest_read
    end
  end
end