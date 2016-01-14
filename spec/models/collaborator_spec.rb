require "rails_helper"

RSpec.describe Collaborator, :type => :model do
  it 'can load the class' do
    expect(Collaborator).not_to be_nil
  end

  it 'can be created with a wiki and a user' do
    user = User.new(email: 'someone@something.com', name: 'Bob', password: 'whatever')
    user.skip_confirmation!
    user.save!
    wiki = Wiki.create!(user_id: 999)

    collaborator = Collaborator.new(wiki_id: wiki.id, user_id: user.id)

    expect(collaborator).to be_valid
  end

  it 'is not valid when the user is the owner' do
    user = User.new(email: 'someone@something.com', name: 'Bob', password: 'whatever')
    user.skip_confirmation!
    user.save!
    wiki = Wiki.create!(user_id: user.id)

    collaborator = Collaborator.new(wiki_id: wiki.id, user_id: user.id)
    expect(collaborator).not_to be_valid
  end
end
