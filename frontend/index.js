document.addEventListener('click', documentClick, true)

function documentClick(e){
    console.log('clicked on document', e.target)
    let form = document.querySelector('.playlist-form')
    debugger
    if (form){
        form.parentNode.remove()
    }
}

document.addEventListener("DOMContentLoaded", function(){
    console.log('everything loaded')
const container = document.querySelector('#content-container')
const player = document.querySelector('#music-player')
const playlist_button = document.querySelector('#playlist-button')
const playlist_form = document.querySelector('#add-song-to-playlist')

playlist_button.style.display = 'none'

const song_url = 'http://localhost:3000/songs'
const user_url = 'http://localhost:3000/users'

fetchSongs()

function fetchSongs(){
    fetch(song_url).then(resp => resp.json()).then(songs => {console.log(songs); songs.forEach(displaySong)})
}


function displaySong(song){
    let songDiv = document.createElement('div')
    songDiv.classList.add('song-card', 'row')
    container.appendChild(songDiv)
    let songspan = document.createElement('span')
    let titleDiv = document.createElement('div')
    titleDiv.classList.add('col-sm')
    titleDiv.appendChild(songspan)
    songspan.innerText = song.name
    songDiv.appendChild(titleDiv)
    songspan.addEventListener('click', (e) => playMusic(e, song))

    let artistDiv = document.createElement('div')
    artistDiv.classList.add('col-sm')
    let artistspan = document.createElement('span')
    artistspan.innerText = song.artist
    artistDiv.appendChild(artistspan)
    songDiv.appendChild(artistDiv)
    // create playDiv to wrap play button in. 
    let playColDiv = document.createElement('div')
    playColDiv.classList.add('col-sm')
    let playDiv = document.createElement('div')
    playDiv.classList.add('play-button-outer')
    playColDiv.appendChild(playDiv)
    let playButton = document.createElement('div')
    playButton.classList.add('play-button')

    songDiv.insertBefore(playColDiv, titleDiv)
    playDiv.appendChild(playButton)

    playDiv.addEventListener("click", (e) => playMusic(e, song))
    // create a add to playlist button for each song
   let addToPlaylist = document.createElement('i')
   addToPlaylist.classList.add('fa', 'fa-plus-square-o')
   let playlistDiv = document.createElement('div')
   playlistDiv.classList.add('col-sm')
   playlistDiv.appendChild(addToPlaylist)
   let playlist_form_div = document.createElement('div')
   playlistDiv.appendChild(playlist_form_div)
   songDiv.appendChild(playlistDiv)
   addToPlaylist.addEventListener('click', (e) => showPlaylistForm(e, playlist_form_div))
   
}


let showPlaylistForm = (e, playlist_form_div) => {
    console.log('hit form toggle')
    let divToDelete = document.createElement('div')
    // let overlay = document.createElement('div')
    // overlay.classList.add('overlay')
    let playlist_form = document.createElement('form')
    playlist_form.classList.add('playlist-form')
   playlist_form.innerHTML =  "<div class='form-group'><input type='text' name='playlist-name' placeholder='Name for New Playlist'></div><div class='form-group' id='playlist-select'><label>Or, add to existing:</label></div>"
   divToDelete.appendChild(playlist_form)
//    divToDelete.appendChild(overlay)
   playlist_form_div.appendChild(divToDelete)


//     overlay.addEventListener('click', (e) =>{
//     console.log('hit overlay')
//     e.currentTarget.parentElement.remove()

// })


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
            currentUser = user
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
