document.addEventListener("DOMContentLoaded", function(){
    let logoutButt = document.getElementById('logout-button')
    logoutButt.style.display = 'none'
    console.log('everything loaded')
const container = document.querySelector('#content-container')
const player = document.querySelector('#music-player')
const playlist_button = document.querySelector('#playlist-button')
playlist_button.style.display = 'none'

const song_url = 'http://localhost:3000/songs'
const user_url = 'http://localhost:3000/users'
const playlist_url = 'http://localhost:3000/playlists'

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
    let playDiv = document.createElement('div')
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
    audio.classList.add('container-fluid', 'fixed-bottom')
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
        } 
        else {
                alert('that user does not exist')
        }
    })
    })
}
    function displayUser(user){
        let h2 = document.createElement('h2')
        h2.innerText = `Welcome, ${user.username}`
        let title = document.querySelector('h1')
        title.appendChild(h2)

        toggle_login = !toggle_login
        form.style.display = 'none'

        login_button.style.display = 'none'
        logoutButt.style.display = 'block'

        // let firstLi = document.querySelector('ul li')
        // firstLi.appendChild(a)

        let playlist_button = document.querySelector('#playlist-button')
        playlist_button.style.display = 'block'

       displayPage(user)
       displayPlaylists(user)

       logoutButt.addEventListener('click', logout)
     

    }

    function logout(e){
        let navH2 = document.querySelector('h2')
            navH2.remove()
            content.innerHTML ='', 
            form.style.display = 'block'
            e.target.style.display = 'none'
            playlist_button.style.display = 'none'
            login_button.style.display = 'block'
            form[0].value = ''
            fetchSongs()  
    }

    function displayPage(user){
     let songCard =  document.querySelectorAll('.song-card')
     songCard.forEach(song =>  song.style.display = 'none')
     playlist_button.addEventListener("click", () => {displayPlaylists(user)})
    }       
          
 let content = document.getElementById('content-container')

    function displayPlaylists(user){
        content.innerHTML = ""
         user.playlists.forEach((playlist) => {
           let playlistDiv = document.createElement('div')
           playlistDiv.className ='card'
           let playlistImg = document.createElement('img') 
           playlistImg.src = playlist.image_url
           playlistImg.className = 'car-img-top'
           let cardBodyDiv = document.createElement('div')
           cardBodyDiv.className = ('card-body')
           let cardText = document.createElement('p')
           cardBodyDiv.appendChild(cardText)
            cardText.innerText = playlist.name
           content.appendChild(playlistDiv)
           playlistDiv.append(playlistImg, cardBodyDiv)
                     

        cardText.addEventListener('click', (e) => {showPlaylistSongs(e, playlist)}, {once : true});
        playlistImg.addEventListener('click', (e) => {showPlaylistSongs(e, playlist)}, {once : true});
    })
}

 function showPlaylistSongs(e, playlist){
        let listDiv = document.createElement('div')
        let listH3 = document.createElement('h3')
        listH3.innerText = playlist.name
        listDiv.appendChild(listH3)
        let plist = document.querySelectorAll('.card-body')
     plist.forEach((list) => {
        if (list.innerText === playlist.name){
            let pImg = document.createElement('img') 
             pImg.src = playlist.image_url
             content.innerHTML = ""
             content.append(pImg, listH3)
         playlist.songs.forEach((song) => {
         displaySong(song)})
        }
        else{      
             list.style.display = 'none'               
        }
        })
    }





})
