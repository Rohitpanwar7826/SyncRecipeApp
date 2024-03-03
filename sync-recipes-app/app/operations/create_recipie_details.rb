class CreateRecipieDetails < Base
  class << self
    def call
      process
    end

    def process
      lists = fetch_all_lists
      lists.find_each do |list|
        url_end_point = generate_url(list.meal_id)
        response = ApiService.call(url_end_point)
        if response.code == "200"
          json_response = JSON.parse(response.body)
          json_response["meals"].present? && json_response["meals"].each do |detail_json|
            create_detail_record(detail_json, list)
          end
        end
      end
    end

    def fetch_all_lists
      ::List.all
    end

    def generate_url(id)
      "#{RecipieDetails}#{id}"
    end

    def create_detail_record(json_response, list)
      list = list.build_detail(generate_detail_params(json_response))
      list.save
    end

    def generate_detail_params(json_record)
      {
        meal_id: json_record["idMeal"],
        topic: json_record["strMeal"],
        category: json_record["strCategory"],
        area: json_record["strArea"],
        instructions: json_record["strInstructions"],
        image: json_record["strMealThumb"],
        tags: json_record["strTags"],
        youtube: json_record["strYoutube"]
      }
    end
  end
end