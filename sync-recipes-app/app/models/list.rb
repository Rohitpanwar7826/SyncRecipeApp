class List < ApplicationRecord
  belongs_to :category

  has_one :detail, dependent: :destroy
  has_many :likes, as: :likeable

end

