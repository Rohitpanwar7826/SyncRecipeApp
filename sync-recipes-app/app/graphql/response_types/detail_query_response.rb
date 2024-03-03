module ResponseTypes
  class DetailQueryResponse < Types::BaseObject
    field :success, Boolean, null: false
    field :list_name, String, null: true
    field :result, ::Types::DetailType, null: true
  end
end