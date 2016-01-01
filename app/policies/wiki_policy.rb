class WikiPolicy < ApplicationPolicy
  def show?
    user.admin? || !record.private? || (record.private? && record.user_id == user.id)
  end
end
