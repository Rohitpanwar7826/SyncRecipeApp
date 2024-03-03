class Category < ApplicationRecord
  has_many :lists, dependent: :destroy
  has_many :likes, as: :likeable

  def total_likes
    likes.to_a.size
  end
end
