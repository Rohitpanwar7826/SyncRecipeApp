require 'net/http'
require "uri"

class ApiService
  class << self

    def call(url)
      process(url)
    end

    def process(url)
      uri = generate(url)
      Net::HTTP.get_response(uri)
    end

    def generate(url)
      URI(url)
    end
  end
end