require "rails_helper"

RSpec.describe Collaborator, :type => :model do
  before (:each) do
    @user = User.new(email: 'someone@something.com', name: 'Bob', password: 'whatever')
    @user.skip_confirmation!
    @user.save!
  end

  it 'can load the class' do
    expect(Collaborator).not_to be_nil
  end

  it 'can be created with a wiki and a user' do
    @user2 = User.new(email: 'someone2@something.com', name: 'Bill', password: 'whatever')
    @user2.skip_confirmation!
    @user2.save!

    wiki = Wiki.create!(user: @user2)
    collaborator = Collaborator.new(wiki: wiki, user: @user, email: @user.email)

    expect(collaborator).to be_valid
  end

  it 'is not valid when the user is the owner' do
    wiki = Wiki.create!(user: @user)
    collaborator = Collaborator.new(wiki: wiki, user: @user)

    expect(collaborator).not_to be_valid
  end

  it 'is not valid when the user does not exist' do
    wiki = Wiki.create!(user: @user)
    collaborator = Collaborator.new(wiki: wiki, user: nil)

    expect(collaborator).not_to be_valid
  end
end
