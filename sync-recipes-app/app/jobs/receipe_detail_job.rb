class ReceipeDetailJob < ApplicationJob
  queue_as :default

  def perform(*args)
    CreateRecipieDetails.call
  end
end
