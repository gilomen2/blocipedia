class WikisController < ApplicationController
  def index
    @wikis = policy_scope(Wiki).paginate(page: params[:page], per_page: 20)
    authorize @wikis
  end

  def show
    @wiki = Wiki.find(params[:id])
    @user = current_user
    authorize @wiki
  end

  def new
    @wiki = Wiki.new
    @user = current_user
    authorize @wiki
  end

  def create
    @wiki = Wiki.new
    @wiki.update_attributes(permitted_attributes(@wiki))
    @wiki.user = current_user
    authorize @wiki
    if @wiki.save
      flash[:notice] = "Your new Wiki was saved."
      redirect_to @wiki
    else
      flash[:error] = "There was a problem saving the Wiki. Please try again."
      redirect_to new_wiki_path
    end
  end

  def edit
    @wiki = Wiki.find(params[:id])
    @user = current_user
    authorize @wiki
  end

  def update
    @wiki = Wiki.find(params[:id])
    authorize @wiki
    if @wiki.update_attributes(permitted_attributes(@wiki))
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
