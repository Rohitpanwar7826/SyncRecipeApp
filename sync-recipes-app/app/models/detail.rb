class Detail < ApplicationRecord
  belongs_to :list
  has_many :imakes, class_name: 'IMake'
end
