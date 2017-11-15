class Api::TailgateMembersController < ApplicationController

    def index
        @tailgate_members = TailgateMember.all
        render json: @tailgate_members
    end
        
    def show
        event_ids = params[:tailgate_event_id]
        # tailgate_member_id = params[:id]
        @tailgate_member = TailgateMember.joins(:user).includes(:user).where("tailgate_event_id = ?", event_ids)
        @tailgate_response = []
        @tailgate_member.each do |member|
        user = {
            user: member.user.name
        }
        @tailgate_response << user
    end
        render json: @tailgate_response
    end
        
    def create
        @user = current_user
        tailgate_member = tailgate_members_params.merge({user_id: @user.id})
        @tailgate_member = TailgateMember.create!(tailgate_member)
        render json: @tailgate_member
        
    end
        
    def update
        
    end
        
    def destroy
        tailgate_member_id = params[:id]
        @tailgate_member = TailgateMember.find_by_id(tailgate_member_id)
        @tailgate_member.destroy
        render json: {
            msg: "This person was removed from the tailgate"
        }
                
    end
    private
    
        def tailgate_members_params
        
            params.require(:tailgate_member).permit(:tailgate_event_id) 
        end
end
