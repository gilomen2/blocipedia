class WikiPolicy < ApplicationPolicy
  def show?
    (user.present? && user.admin?) || !record.private? || (record.private? && record.user_id == user.id)
  end
  def permitted_attributes
    if user.admin? || (user.premium? && record.user_id == user.id)
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
      wikis = []
      if user && user.admin?
        wikis = scope.all
      elsif user && user.premium?
        all_wikis = scope.all
        all_wikis.each do |wiki|
          if wiki.public? || wiki.user == user || wiki.users.include?(user)
            wikis << wiki
          end
        end
      else
        all_wikis = scope.all
        wikis = []
        all_wikis.each do |wiki|
          if wiki.public? || wiki.users.include?(user)
            wikis << wiki
          end
        end
      end
      wikis
    end
  end
end
