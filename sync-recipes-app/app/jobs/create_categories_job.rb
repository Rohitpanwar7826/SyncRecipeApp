class CreateCategoriesJob < ApplicationJob
  queue_as :default
  
  after_perform do
    CreateCategoryListJob.perform_later
  end

  def perform(*args)
    CreateCategoryRecords.call
  end
end
