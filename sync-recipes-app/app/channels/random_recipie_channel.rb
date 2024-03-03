class RandomRecipieChannel < ApplicationCable::Channel
  def subscribed
    stream_from "random_recipie_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
  end
end
