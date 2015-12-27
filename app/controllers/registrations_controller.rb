class RegistrationsController < Devise::RegistrationsController

  def edit
    @user = User.find(current_user)
  end

  protected

    def after_update_path_for(resource)
      flash[:notice] = "User information updated"
      edit_user_registration_path
    end
end
