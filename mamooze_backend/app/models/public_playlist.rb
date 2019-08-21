class PublicPlaylist < ApplicationRecord
    has_many :song_public_playlists
    has_many :songs, through: :song_public_playlists
end
