class Api::TailgateMembersController < ApplicationController

    def index
        @tailgate_members = TailgateMember.all
        render json: @tailgate_members
    end
        
    def show
        tailgate_member_id = params[:id]
        @tailgate_member = TailgateMember.find_by_id(tailgate_member_id)
        render json: @tailgate_member
    end
        
    def create
        
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

end
