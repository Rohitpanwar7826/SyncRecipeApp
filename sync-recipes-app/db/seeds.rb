# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

10.times do
  user_params = {name: Faker::Name.name, email: "#{Faker::Internet.user_name}@gmail.com", password: "123456", password_confirmation: "123456"}
  user = User.create(user_params)

  user.valid? ? (puts user.name) : (puts "Failed to create")
end
user_params = {name: "Rohit Singh", email: "rohit@gmail.com", password: "123456", password_confirmation: "123456"}
user = User.create(user_params)

user.valid? ? (puts user.name) : (puts "Failed to create")