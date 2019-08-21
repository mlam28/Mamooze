class SongPublicPlaylist < ApplicationRecord
    belongs_to :public_playlist
    belongs_to :song
end
