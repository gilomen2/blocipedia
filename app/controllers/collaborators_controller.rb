class CollaboratorsController < ApplicationController
  def create
    @wiki = Wiki.find(params[:wiki_id])
    @collaborator = Collaborator.new(collaborator_params)
    @collaborator.wiki_id = @wiki.id
    @collaborator.user_id = @collaborator.user_by_email.nil? ? nil : @collaborator.user_by_email.id
    authorize @wiki, :create_collaborator?
    if @collaborator.save
      flash[:notice] = "Collaborator added successfully."
    else
      flash[:error] = @collaborator.errors.full_messages.to_sentence
    end
    redirect_to @wiki
  end

  def destroy
    @wiki = Wiki.find(params[:wiki_id])
    authorize @wiki, :remove_collaborator?
    @collaborator = Collaborator.find(params[:id])
    if @collaborator.destroy
      flash[:notice] = "Collaborator successfully removed."
      redirect_to @wiki
    else
      flash[:error] = "There was a problem removing the collaborator. Please try again."
      render :show
    end
  end


  private

  def collaborator_params
    params.require(:collaborator).permit(:wiki_id, :user_id, :email)
  end
end
