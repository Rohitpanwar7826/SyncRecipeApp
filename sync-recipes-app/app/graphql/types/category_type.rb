# frozen_string_literal: true

module Types
  class CategoryType < Types::BaseObject
    field :id, ID, null: false
    field :name, String
    field :total_likes, Int, null: false
    field :isLiked, Boolean, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    def isLiked
      object.likes.pluck(:user_id).include?(context[:current_user_id])
    end
  end
end
