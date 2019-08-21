class PublicPlaylistsController < ApplicationController
    def index
        publicPlay = PublicPlaylist.all 
        render json: publicPlay.to_json(public_playlist_serializer)
    end
    private
    def public_playlist_serializer
        {:include => {
            :songs => {
                :except => [:created_at, :updated_at]}
            },
        :except => [:created_at, :updated_at]
    }
    end
end
