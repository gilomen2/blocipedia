class WikisController < ApplicationController
  def index
    @wikis = Wiki.all
    authorize @wikis
  end

  def show
    @wiki = Wiki.find(params[:id])
  end

  def new
    @wiki = Wiki.new
    authorize @wiki
  end

  def create
    @wiki = Wiki.new(params.required(:wiki).permit(:title, :body, :private))
    @wiki.user = current_user
    authorize @wiki
    if @wiki.save
      flash[:notice] = "Your new Wiki was saved."
      redirect_to @wiki
    else
      flash[:error] = "Theree was a problem saving the Wiki. Please try again."
    end
  end

  def edit
    @wiki = Wiki.find(params[:id])
    authorize @wiki
  end

  def update
    @wiki = Wiki.find(params[:id])
    authorize @wiki
    if @wiki.update_attributes(params.required(:wiki).permit(:title, :body, :private))
      flash[:notice] = "Wiki has been updated."
      redirect_to @wiki
    else
      flash[:error] = "There was a problem updating the Wiki. Please try again."
      render :edit
    end
  end

  def destroy
    @wiki = Wiki.find(params[:id])
    authorize @wiki
    if @wiki.destroy
      flash[:notice] = "Wiki successfully deleted."
      redirect_to wikis_path
    else
      flash[:error] = "There was a problem deleting the Wiki. Please try again."
      render :show
    end

  end
end
