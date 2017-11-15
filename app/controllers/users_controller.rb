class UsersController < ApplicationController

    def index
        @users = current_user
        render json: @users

    end
end
