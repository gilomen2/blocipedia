class WikiPolicy < ApplicationPolicy
  def show?
     !record.private? || (record.private? && record.user_id == user.id)
  end
end
