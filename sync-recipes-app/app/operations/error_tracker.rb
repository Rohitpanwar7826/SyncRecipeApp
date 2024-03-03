class ErrorTracker
  def initialize
    @error = []
  end

  def add_error(error)
    @error << error
  end

  def any_error
    !@error.empty?
  end

  def error_count
    @error.size
  end

  def success
    !any_error
  end

  def list_errors
    @error.join(', ')
  end
end