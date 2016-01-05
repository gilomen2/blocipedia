class CollaboratorsController < ApplicationController
  def create
    @wiki = Wiki.find(params[:wiki_id])
    @collaborator = Collaborator.new(collaborator_params)
    @collaborator.wiki_id = @wiki.id
    # @collaborator.user_id = User.find_by(email: @collaborator.email).id
    if User.find_by(email: @collaborator.email)
      @collaborator.user_id = User.find_by(email: @collaborator.email).id
    end
    if @collaborator.save
      flash[:notice] = "Collaborator added successfully."
      redirect_to @wiki
    else
      flash[:error] = "There was a problem adding the collaborator. Please try again."
      redirect_to @wiki
    end
  end

  def destroy
    @wiki = Wiki.find(params[:wiki_id])
    @collaborator = Collaborator.find(params[:id])
    if @collaborator.destroy
      flash[:notice] = "Collaborator successfully removed."
      redirect_to @wiki
    else
      flash[:error] = "There was a problem removing the collaborator. Please try again."
      render :show
    end
  end

  def look_up_id
    raise

  end

  private

  def collaborator_params
    params.require(:collaborator).permit(:wiki_id, :user_id, :email)
  end

end
