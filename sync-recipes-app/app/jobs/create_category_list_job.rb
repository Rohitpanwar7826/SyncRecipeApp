class CreateCategoryListJob < ApplicationJob
  queue_as :default
  after_perform do
    ReceipeDetailJob.perform_later
  end

  def perform(*args)
    CreateCategoryList.call
  end
end
