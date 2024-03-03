class OperationBuilder
  class << self
    def call(result, error_tracker = ErrorTracker.new)
      {
        success: error_tracker.success,
        error: error_tracker.list_errors.present? ? error_tracker.list_errors : nil,
        result: result
      }
    end
  end
end