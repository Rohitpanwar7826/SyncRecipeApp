class LiveRecipesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "live_recipes_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
