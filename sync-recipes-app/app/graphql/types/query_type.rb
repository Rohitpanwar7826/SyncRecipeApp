module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :login, ::ResponseTypes::CurrentUserResponse, null: true do
      argument :email, String, required: true
      argument :password, String, required: true
    end

    field :current_user, ::ResponseTypes::CurrentUserResponse, null: true do
      argument :token, String, required: true
    end

    field :lists, ::ResponseTypes::ListsQueryResponse, null: true do
      argument :id, ID, required: false
    end

    field :categories, [Types::CategoryType], null: false

    field :detail, ResponseTypes::DetailQueryResponse, null: false do
      argument :list_id, ID, required: false
    end

    field :list_count, Integer, null: false
    field :categore_count, Integer, null: false
    
    field :fav_lists, [Types::ListType], null: false
    field :fav_categories, [Types::CategoryType], null: false

    field :recent_liked, ResponseTypes::RecentLikedResponse, null: false

    def fav_lists
      user = User.find_by_id(context[:current_user_id])
      raise "User not Found" if !user.present?
      user.lists.includes(:likes).order(:name)
    end

    def fav_categories
      user = User.find_by_id(context[:current_user_id])
      raise "User not Found" if !user.present?
      user.categories.includes(:likes)
    end

    def detail(list_id:)
      list = List.find_by(id: list_id)
      detail = list&.detail
      process_for_create_live_imake(context[:current_user_id], detail)
      {
        success: detail.nil? ? false : true,
        list_name: detail.nil? ? nil : list.name,
        result:  detail.nil? ? nil : detail,
      }
    end

    def process_for_create_live_imake(current_user_id, detail)
      return if !detail.present?
      CreateLiveImakeJob.perform_later(current_user_id, detail.id)
    end

    def login(email:, password:)
      User.find_by(email: email).
      yield_self { |user| user&.authenticate(password) }.
      yield_self { |user|
        {
          validate_user: !!user,
          user: user ? user : nil 
        } 
      }
    end

    def recent_liked
      {
        lists: Like.lists.includes(:user, likeable: :likes).order(created_at: :desc).first(10).uniq(&:likeable_id),
        categories: Like.categories.includes(:user,likeable: :likes).order(created_at: :desc).first(10).uniq(&:likeable_id)
      }
    end

    def current_user(token:)
      @user ||= User.find_by(id: token)
      {
        validate_user: !@user.nil?,
        user: @user
      }
    end

    def categories
      ::Category.all.includes(:likes)
    end

    def list_count
      user = User.find(context[:current_user_id])
      user.list_likes_count
    end

    def categore_count
      user = User.find(context[:current_user_id])
      user.categore_likes_count
    end

    def lists(id:)
      categorie = ::Category.find_by(id: id)
      {
        success: categorie.present? ? true : false,
        total_records: categorie.present? ? categorie.lists.count : 0,
        categorie_name: categorie.present? ? categorie.name : nil,
        result: categorie.present? ? categorie.lists&.eager_load(:likes) : []
      }
    end
  end
end
