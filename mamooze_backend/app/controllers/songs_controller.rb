class SongsController < ApplicationController
     
    def index
        songs = Song.all 
        render json: songs.to_json(song_serializer_options)
    end

    def show
        song = Song.find(params[:id])
        render json: song.to_json(song_serializer_options)
    end

    private
    def song_serializer_options
        {:include => {
            :playlists => {:except => [:created_at, :updated_at]}
            },
        :except => [:created_at, :updated_at]}

    end
end
