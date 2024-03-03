class Current < ActiveSupport::CurrentAttributes
  attribute :user
  
  def set_user(user)
    self.user = user
  end
end