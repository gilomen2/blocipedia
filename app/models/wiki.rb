class Wiki < ActiveRecord::Base
  belongs_to :user


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



end
