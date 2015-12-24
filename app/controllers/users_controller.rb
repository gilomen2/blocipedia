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

  #PUT /users/:user_id
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

  #PUT /users/:user_id
  def downgrade_account
    @user = User.find(params[:user_id])
    if @user.premium?
      @user.role = 'standard'
      @user.save
      flash[:notice] = "Account successfully downgraded"
      redirect_to edit_user_registration_path
    else
      flash[:error] = "You cannot downgrade this type of account"
      redirect_to edit_user_registration_path
    end
  end

  def new_charge

  end

  def create_charge
    # Amount in cents
    @amount = 1500

    customer = Stripe::Customer.create(
      :email       =>    params[:stripeEmail],
      :source      =>    params[:stripeToken]
    )

    charge = Stripe::Charge.create(
      :customer    =>    customer.id,
      :amount      =>    @amount,
      :description =>    'Blocipedia Premium Customer',
      :currency    =>    'usd'
    )

    current_user.upgrade_account

  rescue Stripe::CardError => e
    flash[:Error] = e.message
    redirect_to new_charge_path
  end

  private

  def user_params
    params.require(:user).permit(:name, :avatar)
  end
end
