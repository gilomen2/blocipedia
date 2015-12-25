class ChargesController < ApplicationController

  def create
    # Amount in cents
      @amount = 1500

      customer = Stripe::Customer.create(
        :email       =>    params[:stripeEmail],
        :card        =>    params[:stripeToken]
      )

      charge = Stripe::Charge.create(
        :customer    =>    customer.id,
        :amount      =>    @amount,
        :description =>    'Blocipedia Premium Customer',
        :currency    =>    'usd'
      )

    upgrade_account

    rescue Stripe::CardError => e
      flash[:error] = e.message
      redirect_to edit_user_registration_path
  end


  def upgrade_account
    @user = current_user
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

  def downgrade_account
    @user = current_user
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


end
