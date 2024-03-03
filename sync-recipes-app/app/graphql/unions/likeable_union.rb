module Unions
  class LikeableUnion <  Types::BaseUnion
    possible_types Types::ListType, Types::CategoryType

    def self.resolve_type(object, context)
      case object.class.name
      when "Category"
        Types::CategoryType
      when "List"
        Types::ListType
      else
        raise("Unexpected object: #{object}")
      end
    end
  end
end