class User < ApplicationRecord
  has_secure_password

  has_many :list_likes, -> { where( { likeable_type: 'List' } ) }, class_name: 'Like'

  has_many :categore_likes, -> { where( { likeable_type: 'Category' } ) }, class_name: 'Like'

  has_many :lists, through: :list_likes, source: 'likeable', source_type: 'List'
  has_many :categories, through: :categore_likes, source: 'likeable', source_type: 'Category'


  def list_likes_count
    list_likes.to_a.size
  end

  def categore_likes_count
    categore_likes.to_a.size
  end
end
