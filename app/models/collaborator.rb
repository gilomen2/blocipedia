class Collaborator < ActiveRecord::Base
  belongs_to :user
  belongs_to :wiki
  validates_uniqueness_of :user_id, scope: :wiki_id, message: "is already a collaborator"
  validates_presence_of :user_id, scope: :wiki_id, message: "does not exist"
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
    if user_id == nil
      nil
    else
      User.find(user_id)
    end
  end

  def user_exists?
    User.exists?(user)
  end

  def is_owner?
    wiki.user == user
  end

  def user_is_not_owner
    if is_owner?
      errors.add(:collaborator, "can't be the wiki's owner")
    end
  end
end
