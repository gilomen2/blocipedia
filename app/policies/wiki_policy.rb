class WikiPolicy < ApplicationPolicy
  def show?
    (user.present? && user.admin?) || !record.private? || (record.private? && record.user_id == user.id)
  end
  def permitted_attributes
    if user.admin? || user.premium?
      [:title, :body, :private]
    else
      [:title, :body]
    end
  end
end
