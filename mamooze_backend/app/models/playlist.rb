class Playlist < ApplicationRecord
    has_many :user_playlists
    has_many :users, through: :user_playlists
    has_many :song_playlists
    has_many :songs, through: :song_playlists
    accepts_nested_attributes_for :song_playlists
end
