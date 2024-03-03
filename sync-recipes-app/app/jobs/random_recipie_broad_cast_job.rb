class RandomRecipieBroadCastJob < ApplicationJob
  queue_as :default
  
  after_perform do
    RandomRecipieBroadCastJob.set(wait: 5.seconds).perform_later
  end

  
  def random_recipie
    response = ApiService.call("https://www.themealdb.com/api/json/v1/1/random.php")
    if response.code == "200"
      json_response = JSON.parse(response.body)
      json_response["meals"].first
    end
  end

  def perform(*args)
    record  = RandomRecipie.order("RANDOM()").limit(1).first
    record =  random_recipie if record.nil?
    data = {
      id: record['meal_id'],
      image: record['image'] || record['strMealThumb'],
      category: record['category'],
      topic: record['topic']
    }
    ActionCable.server.broadcast "random_recipie_channel", data
  end
end
