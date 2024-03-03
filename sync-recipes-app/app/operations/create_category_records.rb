class CreateCategoryRecords < Base
  class << self
    def call
      process
    end

    def process
      response = ApiService.call(CATEGORY_RECORDS_END_POINT)
      if response.code == "200"
        json_response = JSON.parse(response.body)
        json_response["meals"].each do |category_name|
          category_params = permit_params(category_name)
          create_catogory(::Category, category_params)
        end
      end
    end

    def permit_params(params)
      {
        name: params["strCategory"]
      }
    end

    def create_catogory(klass, params)
      klass.find_or_create_by(params)
    end
  end
end