class UsersController < ApplicationController


    def index
        @user = current_user
        render json: @user
    end
    def show
        @user = current_user
        # tailgate_member = tailgate_members_params.merge({user_id: @user.id})
        # @tailgates = User
        # .left_joins(:tailgate_members)
        # .includes(:tailgate_members)  
        # .find_by_id(current_user.id)
        #.joins(:tailgate_event).includes(:tailgate_event).where("user_id = ?", @user.id)
        user_response = @user.tailgate_members.map do |event|
        {
            tailgate_name: event.tailgate_event.tailgate_name,
            tailgate_id: event.tailgate_event.id
        }
    end
        render json: user_response
    end
    # tailgate_response = {
    #     about: @tailgate_event.about,
    #     cost: @tailgate_event.cost,
    #     tailgate_name: @tailgate_event.tailgate_name,
    #     user: @tailgate_event.user.name
    # }
    # private

    # def tailgate_members_params
        
    #   params.require(:tailgate_member).permit(:user_id) 
    # end
end
