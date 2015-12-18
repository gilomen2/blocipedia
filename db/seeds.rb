require "faker"

#Create users with roles
admin = User.new(
  name:      'Admin User',
  email:     'admin@example.com',
  password:  'helloworld',
  role:      'admin'
)

admin.skip_confirmation!
admin.save!

premium = User.new(
  name:      'Premium User',
  email:     'premium@example.com',
  password:  'helloworld',
  role:      'premium'
)

premium.skip_confirmation!
premium.save!

standard = User.new(
  name:      'Standard User',
  email:     'standard@example.com',
  password:  'helloworld'
)

standard.skip_confirmation!
standard.save!

#Create Users
5.times do
  user = User.new(
    name:     Faker::Name.name,
    email:    Faker::Internet.email,
    password: Faker::Lorem.characters(10)
  )
  user.skip_confirmation!
  user.save!
end
users = User.all


#Create Wikis
50.times do
  Wiki.create!(
    user:    users.sample,
    title: Faker::Lorem.sentence,
    body:  Faker::Lorem.paragraph,
    private: [true, false].sample
)
end
wikis = Wiki.all


puts "Seed finished"
puts "#{User.count} users created"
puts "#{Wiki.count} posts created"

