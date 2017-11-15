module Services

    class OpenWeatherMapServices
        include HTTParty

        def self.get_weather(zipcode)
        @access_api_key = ENV['MY_API_KEY']

        @response = HTTParty.get("http://api.openweathermap.org/data/2.5/weather?zip=#{zipcode},us&units=imperial&appid=#{@access_api_key}")
        @response
    end
  end  
end