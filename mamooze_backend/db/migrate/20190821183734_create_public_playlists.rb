class CreatePublicPlaylists < ActiveRecord::Migration[5.2]
  def change
    create_table :public_playlists do |t|
      t.string :name
      t.timestamps
    end
  end
end
