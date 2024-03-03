module ResponseTypes
  class RecentLikedResponse < Types::BaseObject
    field :lists, [Types::LikeType], null: false
    field :categories, [Types::LikeType], null: false
  end
end