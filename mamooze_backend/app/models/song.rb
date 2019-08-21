class Song < ApplicationRecord
    has_many :song_playlists
    has_many :playlists, through: :song_playlists
    has_many :song_public_playlists
    has_many :public_playlists, through: :song_public_playlists
end
