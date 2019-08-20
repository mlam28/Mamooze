class SongPlaylistsController < ApplicationController

    def index
        songs = SongPlaylist.all 
        render json: songs
    end

    def create
        song_relation = SongPlaylist.create(song_playlist_params)
        render json: song_relation
    end

    private

    def song_playlist_params
        params.require(:song_playlist).permit(:song_id, :playlist_id)
    end
end
