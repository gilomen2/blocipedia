class Wiki < ActiveRecord::Base
  belongs_to :user
  has_many :collaborators
  has_many :users, through: :collaborators

  delegate :users, to: :collaborators

  after_initialize :set_default


  def set_default
    self.private = false if self.private.nil?
  end


  def private?
    self.private == true
  end

  def public?
    self.private == false
  end

  def owner_of?
    self.user_id = user.id
  end

  def collaborators
    Collaborator.where(wiki_id: id)
  end

end
