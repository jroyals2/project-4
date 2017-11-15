require 'open_weather_map_services'

class Api::WeatherController < ApplicationController

    def show
        @weather = Services::OpenWeatherMapServices.get_weather(params[:zipcode])
        render json: @weather
    end

end
