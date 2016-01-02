class Wiki < ActiveRecord::Base
  belongs_to :user

  after_initialize :set_public

  before_validation :disallow_private

  t = Wiki.arel_table

  scope :visible_to, -> (user) {
    if user
      if user.admin?
        Wiki.all
      elsif t[:user_id].eq(user.id)
        Wiki.where(t[:private].eq(false).or(t[:user_id].eq(user.id)))
      end
    else
      Wiki.where(t[:private].eq(false))
    end
  }



  scope :private_wikis, -> (user) { Wiki.where(t[:private].eq(true).and(t[:user_id].eq(user.id))) }

  def private?
    self.private == true
  end

  private
    def set_public
      self.private ||= false
    end
    def disallow_private
      if user.standard?
        self.private == false
      end
    end

end
