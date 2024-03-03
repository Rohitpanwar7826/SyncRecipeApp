module ResponseTypes
  class CurrentUserResponse < Types::BaseObject
    field :validate_user, Boolean, null: true
    field :user, Types::UserType, null: true
  end
end