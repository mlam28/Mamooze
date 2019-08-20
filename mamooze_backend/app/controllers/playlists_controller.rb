class PlaylistsController < ApplicationController
    def index
        playlists = Playlist.all 
        render json: playlists.to_json.to_json(playlist_serializer)
    end

    def show
        playlist = Playlist.find(params[:id])
        render json: playlist.to_json(playlist_serializer)
    end

    def update
        playlist = Playlist.find(params[:id])
        playlist.update(playlist_params)
        render json: playlist.find(params[:id])
    end

    private

    def playlist_params
        params.require(:playlist).permit(:name, :image_url, :users)
    end

    def playlist_serializer
        {:include => {
            :users => {
                :except => [:created_at, :updated_at]
            },
            :songs => {
                :except => [:created_at, :updated_at]
            }
        },
        :except => [:created_at, :updated_at]
    }
    end
    
end
