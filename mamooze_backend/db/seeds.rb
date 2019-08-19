# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'net/http'
require 'open-uri'
require 'json'

Song.destroy_all
Playlist.destroy_all
UserPlaylist.destroy_all
SongPlaylist.destroy_all
User.destroy_all

class GetSongs

    URL = 'https://api.deezer.com/album/'

    def get_songs(id)
        uri = URI.parse(URL + id)
        response = Net::HTTP.get_response(uri)
        response.body
    end

end

# jonas brothers seed data
    jobros_id = '371771'

    jobros_songs = JSON.parse(GetSongs.new.get_songs(jobros_id))


    jobros_list = jobros_songs['tracks']['data'].collect do |song|
        {name: song['title'], artist: 'Jonas Brothers', url: song['preview']}
    end


    jobros_list.each do |song|
        Song.create(song)
    end

# one direction seed data
    one_direction_id = '9146145'

    one_d_songs = JSON.parse(GetSongs.new.get_songs(one_direction_id))
    puts one_d_songs

    one_d_list = one_d_songs['tracks']['data'].collect do |song|
        {name: song['title'], artist: 'One Direction', url: song['preview']}
    end

    one_d_list.each do |song|
        Song.create(song)
    end


summerp = Playlist.create(name: 'what time is it? summertime')
newp = Playlist.create(name: 'Aint No laws')
sam = User.create(name: 'Samantha Kane', username: 'sammo12')
UserPlaylist.create(user_id: sam.id, playlist_id: summerp.id)
newList = UserPlaylist.create(user_id: sam.id, playlist_id: newp.id)

SongPlaylist.create(song_id: Song.all[2].id, playlist_id: summerp.id)
SongPlaylist.create(song_id: Song.all[6].id, playlist_id: summerp.id)
SongPlaylist.create(song_id: Song.all[3].id, playlist_id: summerp.id)
SongPlaylist.create(song_id: Song.all[10].id, playlist_id: summerp.id)
SongPlaylist.create(song_id: Song.all[20].id, playlist_id: summerp.id)
SongPlaylist.create(song_id: Song.all[16].id, playlist_id: summerp.id)
SongPlaylist.create(song_id: Song.all[28].id, playlist_id: summerp.id)
SongPlaylist.create(song_id: Song.all[21].id, playlist_id: newp.id)
SongPlaylist.create(song_id: Song.all[1].id, playlist_id: newp.id)
SongPlaylist.create(song_id: Song.all[7].id, playlist_id: newp.id)
SongPlaylist.create(song_id: Song.all[19].id, playlist_id: newp.id)
