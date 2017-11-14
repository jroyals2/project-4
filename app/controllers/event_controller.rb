class EventController < ApplicationController

    def show 
        event_id = params[:event_Id]
        @event = Event.find_by_id(event_id)
        @tailgate = @event.tailgate_events.all

        render json: @tailgate
    end
end
