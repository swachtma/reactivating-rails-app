class Chapter < ApplicationRecord
  has_many :nodes
  
  scope :fsa, -> { order(id: :asc).select(:id, :title) }
end