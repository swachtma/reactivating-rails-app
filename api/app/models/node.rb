	
# == Schema Information
#
# Table name: nodes
#
#  id         :integer          not null, primary key
#  chapter_id :integer
#  node_type  :string
#  content    :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
 
class Node < ApplicationRecord
  belongs_to :chapter
  
  scope :fsa, -> { 
    order(chapter_id: :asc, id: :asc ).select(
      :id, :chapter_id, :node_type, :content
    )
  }
end