# frozen_string_literal: true

module Types
  class DetailType < Types::BaseObject
    field :id, ID, null: false
    field :list_id, ID, null: false
    field :meal_id, Integer
    field :topic, String
    field :category, String
    field :area, String
    field :instructions, String
    field :image, String
    field :tags, String
    field :youtube, String
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
