# category:references name:string meal_id:bigint image:string

class CreateCategoryList < Base
  class << self
    def call
      process
    end

    def process
      ::Category.find_each do |categore|
        categore_list_end_point = generate_api_end_point(categore)
        process_for_category(categore_list_end_point, categore)
      end
    end

    def generate_api_end_point(categore)
      "#{CATEGORY_LIST_END_POINT}#{categore.name}"
    end

    def process_for_category(url, categore)
      response = ApiService.call(url)
      if response.code == "200"
        json_response = JSON.parse(response.body)
        json_response["meals"].present? && json_response["meals"].each do |list|
          params = params_category_list_params(list)
          create_category_list_record(params, categore)
        end
      end
    end

    def params_category_list_params(list_json)
      {
        name: list_json["strMeal"],
        image: list_json["strMealThumb"],
        meal_id: list_json["idMeal"]
      }
    end

    def create_category_list_record(params, categore)
      categore.lists.find_or_create_by(params)
    end
  end
end