class CollaboratorsController < ApplicationController
  def create
    @collaborator = Collaborator.new
    @collaborator.wiki_id = Wiki.find(params[:wiki_id])
    @collaborator.user_id = :user_id
    if @collaborator.save
      flash[:notice] = "Collaborator added successfully."
      redirect_to @wiki
    else
      flash[:error] = "There was a problem adding the collaborator. Please try again."
      redirect_to @wiki
    end
  end

  def destroy

  end

end
