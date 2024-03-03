# frozen_string_literal: true

module Types
  class ListType < Types::BaseObject
    field :id, ID, null: false
    field :category_id, ID, null: false
    field :name, String
    field :meal_id, Integer
    field :image, String
    field :likes, [Types::LikeType], null: false
    field :total_likes, Integer, null: false
    field :is_liked, Boolean, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    def is_liked
      !!object.likes.pluck(:user_id).include?(context[:current_user_id])
    end

    def total_likes
      object.likes.to_a.size
    end
  end
end
