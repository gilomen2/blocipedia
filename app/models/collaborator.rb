class Collaborator < ActiveRecord::Base
  belongs_to :user
  belongs_to :wiki
  before_save :check_user_exists?
  validates_uniqueness_of :user_id, scope: :wiki_id
  validates_presence_of :user_id, scope: :wiki_id
  validate :user_is_not_owner


  def self.users
    User.where(id: pluck(:user_id))
  end

  def self.wikis
    Wiki.where(id: pluck(:wiki_id))
  end

  def wiki
    Wiki.find(wiki_id)
  end

  def user
    User.find(user_id)
  end

  def check_user_exists?
    User.exists?(self.user_id)
  end

  def is_owner?
    wiki.user == user
  end

  def user_is_not_owner
    if is_owner?
      errors.add(:user, "Can't be the wiki's owner")
    end
  end
end
