class CreateLikes < Base
  class << self
    def call(user_id, likeable_id, type_name, error_tracker = ErrorTracker.new)
      result = process(user_id, likeable_id, type_name, error_tracker)
      OperationBuilder.call(result, error_tracker)
    end

    def process(user_id, likeable_id, type_name, error_tracker)
      klass = generate_class_name(type_name)
      if klass.nil?
        error_tracker.add_error("Not valid source found #{klass}")
        return klass
      end
      process_for_klass(klass, likeable_id, user_id, error_tracker)
    end

    def process_for_klass(klass, likeable_id, user_id, error_tracker)
      target_record = klass.find_by(id: likeable_id)
      if target_record.nil?
        error_tracker.add_error("Record not found for this id: #{likeable_id}")
        return nil
      end
      like_record = find_record_already_present(target_record, user_id)
      like_record.nil? ? create_like_record(target_record, user_id) : like_record.destroy
      target_record
    end

    def find_record_already_present(record, user_id)
      record.likes.find_by({
        user_id: user_id
      })
    end

    def generate_class_name(type_name)
      begin
        klass = type_name.titleize.constantize
      rescue => exception
        klass = nil
      end
      klass
    end

    def create_like_record(target_record, user_id)
      target_record.likes.create({
        user_id: user_id
      })
    end
  end
end