
class CreateRandomRecipiesRecords < Base
  class << self
    def call
      process
    end
    
    def process
      response = ApiService.call(RANDOM_URL_RECIPIES_END_POINT)
      if response.code == "200"
        json_response = JSON.parse(response.body)
        process_for_response_random_recipies(json_response)
      end
    end

    def process_for_response_random_recipies(response_body)
      response_body["meals"].each do |json_record|
        random_recipies_params = generate_random_recipies_params(json_record)
        create_random_recipies_records(::RandomRecipie, random_recipies_params)
      end
    end

    def generate_random_recipies_params(json_record)
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

    def create_random_recipies_records(klass_name, params)
      klass_name.find_or_create_by(params)
    end
  end
end