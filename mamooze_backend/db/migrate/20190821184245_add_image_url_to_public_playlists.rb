class AddImageUrlToPublicPlaylists < ActiveRecord::Migration[5.2]
  def change
    add_column :public_playlists, :image_url, :string, :default => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFxVBzLzZ7j2SxWQmWAhbY8x4mxScaaBuh5i4H3v9tfbIo9O9iRQ'
  end
end
