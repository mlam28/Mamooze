class UserPlaylistsController < ApplicationController
    def index
        userplay = UserPlaylist.all 
        render json: userplay.to_json
    end

    def create
        userplay = UserPlaylist.create(up_params)
        render json: userplay.to_json
    end

private
    def up_params
        params.require(:user_playlist).permit(:user_id, :playlist_id)
    end

end
