class User < ApplicationRecord
    has_many :user_playlists
    has_many :playlists, through: :user_playlists
end
