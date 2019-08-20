class UsersController < ApplicationController

    def index
        users = User.all 
        render json: users.to_json(user_serializer_options)
    end

    def show
        user = User.find(params[:id])
        render json: user.to_json(user_serializer_options)
    end

    private

    def user_serializer_options
        {:include => {
            :playlists => {
                :include => {:users => {:except => [:created_at, :updated_at]}, 
                    :songs => {:except => [:created_at, :updated_at]}},
                :except => [:created_at, :updated_at]
            }

        },
        :except => [:created_at, :updated_at]
    }
    end
end
