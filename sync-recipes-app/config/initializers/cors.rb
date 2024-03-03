Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*' # add any additional origins as needed
    resource '/graphql', headers: :any, methods: [:post, :get, :deletet, :option, :head]
  end
end
