class CreateLiveImakeJob < ApplicationJob
  queue_as :default

  def perform(user_id, detail_id)
    process(user_id, detail_id)
  end

  def process(user_id, detail_id)
    create_imake_record(user_id, detail_id)
  end

  def create_imake_record(user_id, detail_id)
    imake = IMake.find_by({ user_id: user_id, detail_id: detail_id })
    return if imake.present?
    imake = IMake.create({ user_id: user_id, detail_id: detail_id })
    DestroyLiveImakeJob.set(wait: 2.minutes).perform_later(imake.user_id, imake.detail_id)
  end
end
