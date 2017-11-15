class Api::TailgateEventsController < ApplicationController

    def index
        @user = current_user
        @tailgate_events = @user.tailgate_events
        render json: @tailgate_events
    end


    def show
        tailgate_events_id = params[:id]
        @tailgate_event = TailgateEvent.joins(:user).includes(:user).find_by_id(tailgate_events_id)

        tailgate_response = {
            about: @tailgate_event.about,
            cost: @tailgate_event.cost,
            tailgate_name: @tailgate_event.tailgate_name,
            user: @tailgate_event.user.name
        }
        render json: tailgate_response
    end
        
    def create
        @user = current_user
        @tailgate_event = @user.tailgate_events.create!(tailgate_event_params)
        render json: @tailgate_event
    end
        
    def update
        tailgate_events_id = params[:id]
        @tailgate_event = TailgateEvent.find_by_id(tailgate_events_id)
        @tailgate_event.update_attributes(tailgate_event_params)
        render json: @tailgate_event
        
    end
        
    def destroy
        tailgate_events_id = params[:id]
        @tailgate_event = TailgateEvent.find_by_id(tailgate_events_id)
        @tailgate_event.destroy
        render json: {
            msg: "Delete this event successfully"
        }
                
    end

    private

    def tailgate_event_params
    
        params.require(:tailgate_event).permit(:tailgate_name, :about, :cost, :is_eighteen, :event_id) 
      end
end
