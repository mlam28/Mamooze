class CreateSongPublicPlaylists < ActiveRecord::Migration[5.2]
  def change
    create_table :song_public_playlists do |t|
      t.integer :song_id
      t.integer :public_playlist_id
      t.timestamps
    end
  end
end
