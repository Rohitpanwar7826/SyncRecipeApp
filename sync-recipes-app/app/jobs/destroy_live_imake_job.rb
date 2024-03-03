class DestroyLiveImakeJob < ApplicationJob
  queue_as :default

  def perform(user_id, detail_id)
    process(user_id, detail_id)
  end

  def process(user_id, detail_id)
    imake_record = find_imake_record(user_id, detail_id)
    destroy_imake_record(imake_record)
  end

  def find_imake_record(user_id, detail_id)
    IMake.find_by({ user_id: user_id, detail_id: detail_id })
  end

  def destroy_imake_record(imake_record)
    imake_record&.persisted? ? imake_record.destroy : nil
  end
end
