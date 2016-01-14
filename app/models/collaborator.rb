class Collaborator < ActiveRecord::Base
  belongs_to :user
  belongs_to :wiki
  validate :user_is_not_owner, :collaborator_is_a_user, :already_collaborator


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

  def user_by_email
    if User.find_by(email: self.email)
      User.find_by(email: self.email).id
    else
      nil
    end
  end

  def user_exists?
    User.exists?(user_by_email)
  end

  def is_owner?
    wiki.user.id == user_by_email
  end

  def is_collaborator?
    wiki.collaborators.where(user_id: self.user_by_email).count > 0
  end

  def user_is_not_owner
    if is_owner?
      errors.add(:collaborator, "can't be the wiki's owner")
    end
  end

  def collaborator_is_a_user
    if !user_exists?
      errors.add(:user, "does not exist")
    end
  end

  def already_collaborator
    if is_collaborator?
      errors.add(:user, "is already a collaborator")
    end
  end
end
