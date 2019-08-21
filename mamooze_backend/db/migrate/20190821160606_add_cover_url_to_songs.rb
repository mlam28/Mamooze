class AddCoverUrlToSongs < ActiveRecord::Migration[5.2]
  def change
    add_column :songs, :cover_url, :string
  end
end
