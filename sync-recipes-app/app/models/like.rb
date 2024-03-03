class Like < ApplicationRecord
  belongs_to :likeable, polymorphic: true
  belongs_to :user

  scope :lists, -> { where(likeable_type: 'List') }
  scope :categories, -> { where(likeable_type: 'Category') }
end
