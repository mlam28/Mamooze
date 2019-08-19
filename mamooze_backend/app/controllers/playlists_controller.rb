class PlaylistsController < ApplicationController
    def index
        playlists = Playlist.all 
        render json: playlists.to_json
    end
    
end
