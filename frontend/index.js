document.addEventListener("DOMContentLoaded", function(){
    console.log('everything loaded')
const container = document.querySelector('#content-container')
const player = document.querySelector('#music-player')
const song_url = 'http://localhost:3000/songs'

fetchSongs()

function fetchSongs(){
    fetch(song_url).then(resp => resp.json()).then(songs => {console.log(songs); songs.forEach(displaySong)})
}


function displaySong(song){
    let songDiv = document.createElement('div')
    container.appendChild(songDiv)
    let songspan = document.createElement('span')
    songspan.innerText = song.name
    songDiv.appendChild(songspan)
    songspan.addEventListener('click', (e) => playMusic(e, song))

    let artistspan = document.createElement('span')
    artistspan.innerText = song.artist
    songDiv.appendChild(artistspan)
    let playButton = document.createElement('button')
    playButton.classList.add('button')
    playButton.classList.add('play')
    songDiv.insertBefore(playButton, songspan)

    playButton.addEventListener("click", (e) => playMusic(e, song))
    
}

function playMusic(e, song){
    player.innerHTML = ''
    let audio = document.createElement('audio')
    audio.controls = true
    audio.autoplay = true
    audio.src = song.url
    player.appendChild(audio)
    
}

    const form = document.querySelector('#login-form')
    form.addEventListener('submit', loginUser)


    function loginUser(e){
        e.preventDefault()
    }

})
