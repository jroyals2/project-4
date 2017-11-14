class Api::EventsController < ApplicationController

    def index
        @events = Event.all
        render json: @events
    end

    def show
        event_id = params[:id]
        @event = Event.find_by_id(event_id)
        render json: @event
    end

    def create
        @event = Event.create!(event_params)
        render json: @event
    end

    def update
        event_id = params[:id]
        @event = Event.find_by_id(event_id)
        @event.update_attributes(event_params)
        render json: @event
    end

    def destroy
        event_id = params[:id]
        @event = Event.find_by_id(event_id)
        @event.destroy
        render json: {
            msg: 'Delete the event successfully'
        }

    end

    # def new
    #     event_id = params[:id]
    #     @event = Event.find_by_id(event_id)
    #     @all_tailgates = @event.tailgate_events.all
    #     render json: @all_tailgates
    # end

    private

    def event_params
        params.require(:event).permit(:event_name, :location, :date, :teams) 
    end

end
