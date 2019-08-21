class UserPlaylistsController < ApplicationController
    def index
        userplay = UserPlaylist.all 
        render json: userplay.to_json
    end

    def create
        userplay = UserPlaylist.find_by(up_params)

        if userplay 
        render json: {message: "user already collaborating"}
        else
           userp =  UserPlaylist.create(up_params)
            render json: userp.to_json
        end
    end

private
    def up_params
        params.require(:user_playlist).permit(:user_id, :playlist_id)
    end

end
