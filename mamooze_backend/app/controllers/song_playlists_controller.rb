class SongPlaylistsController < ApplicationController

    def index
        songs = SongPlaylist.all 
        render json: songs
    end

    def create
        song_relation = SongPlaylist.create(song_playlist_params)
        render json: song_relation
    end
    def destroy
        song_play = SongPlaylist.find_by(song_playlist_params)
        song_play.destroy
        render json: {message: "Successfully Removed!"}
    end

    private

    def song_playlist_params
        params.require(:song_playlist).permit(:song_id, :playlist_id)
    end
end
