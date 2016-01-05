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

  class Scope
    attr_reader :user, :scope
    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      if user && user.admin?
        scope.all
      elsif user && user.premium?
        t = Wiki.arel_table
        scope.where(t[:private].eq(false).or(t[:user_id].eq(user.id)))
      else
        scope.where(:private => false)
      end
    end
  end
end
