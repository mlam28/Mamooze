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
PublicPlaylist.destroy_all
SongPublicPlaylist.destroy_all

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
        
        {name: song['title'], artist: 'Jonas Brothers', url: song['preview'], cover_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Lines%2C_Vines_and_Trying_Times_album_cover.jpg/220px-Lines%2C_Vines_and_Trying_Times_album_cover.jpg'}
    end


    jobros_list.each do |song|
        Song.create(song)
    end

# one direction seed data
    one_direction_id = '9146145'

    one_d_songs = JSON.parse(GetSongs.new.get_songs(one_direction_id))
   

    one_d_list = one_d_songs['tracks']['data'].collect do |song|
        {name: song['title'], artist: 'One Direction', url: song['preview'], cover_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/One_Direction_-_Four.png/220px-One_Direction_-_Four.png'}
    end

    one_d_list.each do |song|
        Song.create(song)
    end

# adding more songs
    millenium_id = '1205922'

    backstreet_songs = JSON.parse(GetSongs.new.get_songs(millenium_id))
    puts backstreet_songs

    backstreet_list = backstreet_songs['tracks']['data'].collect do |song|
        {name: song['title'], artist: 'Backstreet Boys', url: song['preview'], cover_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Millennium_cover.jpg/220px-Millennium_cover.jpg'}
    end

    backstreet_list.each do |song|
        Song.create(song)
    end

summerp = Playlist.create(name: 'what time is it? summertime')
newp = Playlist.create(name: 'Aint No laws')
year = Playlist.create(name: 'I took a trip to the year 3000')
sam = User.create(name: 'Samantha Kane', username: 'sammo12')
michelle = User.create(name: 'Michelle', username: 'shelly05')
lisa = User.create(name: 'Lisa', username: 'lisuh88')
nick = User.create(name: 'Nick', username: 'NickNack')
UserPlaylist.create(user_id: sam.id, playlist_id: summerp.id)
UserPlaylist.create(user_id: michelle.id, playlist_id: year.id)
UserPlaylist.create(user_id: sam.id, playlist_id: newp.id)


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
SongPlaylist.create(song_id: Song.all[11].id, playlist_id: year.id)
SongPlaylist.create(song_id: Song.all[12].id, playlist_id: year.id)
SongPlaylist.create(song_id: Song.all[25].id, playlist_id: year.id)
SongPlaylist.create(song_id: Song.all[18].id, playlist_id: year.id)
SongPlaylist.create(song_id: Song.all[13].id, playlist_id: year.id)

guilty = PublicPlaylist.create(name: 'Guilty Pleasures')
pump = PublicPlaylist.create(name: "Pump Up")
master = PublicPlaylist.create(name: 'Master Mix')
SongPublicPlaylist.create(song_id: Song.all[29].id, public_playlist_id: guilty.id)
SongPublicPlaylist.create(song_id: Song.all[34].id, public_playlist_id: guilty.id)
SongPublicPlaylist.create(song_id: Song.all[35].id, public_playlist_id: guilty.id)
SongPublicPlaylist.create(song_id: Song.all[33].id, public_playlist_id: pump.id)
SongPublicPlaylist.create(song_id: Song.all[24].id, public_playlist_id: pump.id)
SongPublicPlaylist.create(song_id: Song.all[15].id, public_playlist_id: pump.id)
SongPublicPlaylist.create(song_id: Song.all[20].id, public_playlist_id: pump.id)
SongPublicPlaylist.create(song_id: Song.all[14].id, public_playlist_id: pump.id)
SongPublicPlaylist.create(song_id: Song.all[4].id, public_playlist_id: pump.id)
SongPublicPlaylist.create(song_id: Song.all[24].id, public_playlist_id: master.id)
SongPublicPlaylist.create(song_id: Song.all[2].id, public_playlist_id: master.id)
SongPublicPlaylist.create(song_id: Song.all[13].id, public_playlist_id: master.id)
SongPublicPlaylist.create(song_id: Song.all[22].id, public_playlist_id: master.id)
SongPublicPlaylist.create(song_id: Song.all[25].id, public_playlist_id: master.id)
SongPublicPlaylist.create(song_id: Song.all[3].id, public_playlist_id: master.id)
SongPublicPlaylist.create(song_id: Song.all[6].id, public_playlist_id: master.id)
SongPublicPlaylist.create(song_id: Song.all[9].id, public_playlist_id: master.id).id
SongPublicPlaylist.create(song_id: Song.all[11].id, public_playlist_id: master.id)



