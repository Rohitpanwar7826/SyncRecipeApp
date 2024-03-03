module Mutations
  class CreateLike < BaseMutation
    # TODO: define return fields
    field :success, Boolean, null: false
    field :error, String, null: true
    field :response, Unions::LikeableUnion, null: true

    # TODO: define arguments
    argument :likeable_id, String, required: true
    argument :type_name, String, required: true

    # TODO: define resolve method
    def resolve(likeable_id:, type_name:)
      response = ::CreateLikes.call(context[:current_user_id], likeable_id, type_name)
      {
        success: response[:success],
        error: response[:error],
        response: response[:result]
      }
    end
  end
end
