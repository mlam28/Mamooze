document.addEventListener("DOMContentLoaded", function(){
    console.log('everything loaded')
const container = document.querySelector('#content-container')
const player = document.querySelector('#music-player')
const playlist_button = document.querySelector('#playlist-button')
playlist_button.style.display = 'none'

const song_url = 'http://localhost:3000/songs'
const user_url = 'http://localhost:3000/users'

fetchSongs()

function fetchSongs(){
    fetch(song_url).then(resp => resp.json()).then(songs => {console.log(songs); songs.forEach(displaySong)})
}


function displaySong(song){
    let songDiv = document.createElement('div')
    songDiv.classList.add('song-card')
    container.appendChild(songDiv)
    let songspan = document.createElement('span')
    songspan.innerText = song.name
    songDiv.appendChild(songspan)
    songspan.addEventListener('click', (e) => playMusic(e, song))

    let artistspan = document.createElement('span')
    artistspan.innerText = song.artist
    songDiv.appendChild(artistspan)
    // create playDiv to wrap play button in. 
    let playDiv = document.createElement('div')s
    playDiv.classList.add('play-button-outer')
    let playButton = document.createElement('div')
    playButton.classList.add('play-button')

    songDiv.insertBefore(playDiv, songspan)
    playDiv.appendChild(playButton)

    playDiv.addEventListener("click", (e) => playMusic(e, song))
    
}

function playMusic(e, song){
    player.innerHTML = ''
    let audio = document.createElement('audio')
    audio.controls = true
    audio.autoplay = true
    audio.src = song.url
    audio.classList.add('container-fluid')
    player.appendChild(audio)
    
}

    const form = document.querySelector('#login-form')
    let toggle_login = false
     let login_button = document.querySelector('#login-button')
     form.style.display = 'none'
     login_button.addEventListener('click', function(){
         console.log('hit toggle')
        toggle_login = !toggle_login
         if (toggle_login) {
            form.style.display = 'block' } 
            else {
                form.style.display = 'none'
            }
     })

    form.addEventListener('submit', loginUser)


    function loginUser(e){
        e.preventDefault()

       username = form.querySelector('input').value

       fetch(user_url).then(resp => resp.json()).then(users => {console.log(users); users.forEach(user => {
        if(user.username === username) {
            displayUser(user);
        } else {
            alert('that user does not exist')
        }

       })})

        
    }


    function displayUser(user){
        let h2 = document.createElement('h2')
        h2.innerText = `Welcome, ${user.username}`
        let title = document.querySelector('h1')
        title.appendChild(h2)

        toggle_login = !toggle_login
        form.style.display = 'none'

        login_button.style.display = 'none'

        let a = document.createElement('a')
        a.innerText = 'Logout'
        a.classList.add('nav-link', 'active')
        a.id = 'logout-button'

        let firstLi = document.querySelector('ul li')
        firstLi.appendChild(a)

        let playlist_button = document.querySelector('#playlist-button')
        playlist_button.style.display = 'block'

    }



})
