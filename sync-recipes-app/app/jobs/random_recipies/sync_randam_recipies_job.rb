class RandomRecipies::SyncRandamRecipiesJob < ApplicationJob
  queue_as :default
  after_perform do
    RandomRecipies::SyncRandamRecipiesJob.set(wait: 1.second).perform_later
  end

  def perform(*args)
    ::CreateRandomRecipiesRecords.call
  end
end
