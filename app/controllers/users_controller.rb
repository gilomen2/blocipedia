class UsersController < ApplicationController
  def update
    if current_user.update_attributes(user_params)
      flash[:notice] = "User information updated"
      redirect_to edit_user_registration_path
    else
      flash[:error] = "Invalid user information"
      redirect_to edit_user_registration_path
    end
  end

  def show
    @user = User.find(params[:id])
  end

  # DELETE /avatar/:user_id
  def remove_avatar
    @user = User.find(params[:user_id])
    @user.remove_avatar!
    @user.save
    flash[:notice] = "Avatar successfully removed"
    redirect_to edit_user_registration_path
  end

  #PUT /account/:user_id
  def upgrade_account
    @user = User.find(params[:user_id])
    if @user.standard?
      @user.role = 'premium'
      @user.save
      flash[:notice] = "Account successfully upgraded"
      redirect_to edit_user_registration_path
    else
      flash[:error] = "You cannot upgrade this type of account"
      redirect_to edit_user_registration_path
    end
  end


  private

  def user_params
    params.require(:user).permit(:name, :avatar)
  end
end
