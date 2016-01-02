class Wiki < ActiveRecord::Base
  belongs_to :user

  after_initialize :set_default

  def set_default
    self.private = false if self.private.nil?
  end


  scope :private_wikis, -> (user) { Wiki.where(t[:private].eq(true).and(t[:user_id].eq(user.id))) }

  def private?
    self.private == true
  end

  def owner_of?
    self.user_id = user.id
  end
end
