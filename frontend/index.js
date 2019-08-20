document.addEventListener('click', documentClick, true)

function documentClick(e){
    console.log('clicked on document', e.target)
    let form = document.querySelector('form.playlist-form')


    let toggle = true

  let nodes = parentNodes(e.target)

  nodes.forEach(node => {
    if (node.nodeName === 'FORM'){
        toggle = false
    }
  })
    // if(e.target.nodeName === 'INPUT'){
       
    //     toggle = false
    // } else if (e.target.nodeName === 'FORM' ) {
       
    //    toggle = false
    // } else if (e.target.nodeName === 'LABEL'){
    //     toggle = false
    // } else if (e.target.className === 'form-group'){
    //     toggle = false
    // } else {
    //     toggle = true
    // }
    if (form && toggle) {
        console.log(e.target)
        form.parentNode.remove()
    }

    console.log(toggle)
}

function parentNodes(e){
    let nodes = []
    nodes.push(e)
    while (e.parentNode){
        nodes.unshift(e.parentNode);
        e = e.parentNode
    }

    return nodes
}

document.addEventListener("DOMContentLoaded", function(){
    let logoutButt = document.getElementById('logout-button') 
    logoutButt.style.display = 'none'
    console.log('everything loaded')
const container = document.querySelector('#content-container')
const player = document.querySelector('#music-player')
const playlist_button = document.querySelector('#playlist-button')
const playlist_form = document.querySelector('#add-song-to-playlist')

playlist_button.style.display = 'none'

const song_url = 'http://localhost:3000/songs'
const user_url = 'http://localhost:3000/users'
const playlist_url = 'http://localhost:3000/playlists/'
const user_playlist_url = 'http://localhost:3000/user_playlists/'

fetchSongs()
musicButton()

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
    fetch(user_url).then(resp => resp.json()).then(users => {console.log(users); 
        
       let foundUser = users.find(function(user) {
        return user.username === username
    });

   if (foundUser){
    displayUser(foundUser)
   } else {
    alert('that user does not exist.')
   }

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

        let collabDiv = document.createElement('h6')
        listH3.append(collabDiv)
        collabDiv.innerText = 'Playlist Collaborators: '

        playlist.users.forEach((user) => {
            let collabList = document.createElement('p')
            collabList.innerText = `${user.username}-`
            collabList.className = 'collablist'
            collabDiv.append(collabList)
        })

        collabForm(listH3, playlist)
    }
    function collabForm(listH3, playlist){
        const colForm = document.createElement('form')
        const formInput = document.createElement('input')
        const dataList = document.createElement('datalist')
        const submitButt = document.createElement('input')
        listH3.appendChild(colForm)
        colForm.innerText = "Add a collaborator: "
        colForm.append(formInput, dataList, submitButt)
        colForm.id = "colform"
        formInput.setAttribute('list', 'users')
        formInput.setAttribute('placeholder', 'username')
        formInput.classList.add('form-control', 'collab')
        submitButt.type = 'submit'
        submitButt.classList.add('btn', 'btn-primary', "btn-sm")
        dataList.id = 'users'
        fetch(user_url)
        .then(resp => resp.json())
        .then(users => { users.forEach((user) => {
            let option = document.createElement('option')
            dataList.append(option)
            if(username !== user.username){ 
                option.value = user.username
                option.dataset.id = user.id
            }
        })
        })


   colForm.addEventListener('submit', (e) => {addCollab(e, playlist)})
    }

function addCollab(e, playlist){
    e.preventDefault()
    let options = e.target.querySelector('datalist').children
    let optionsarray = Array.from(options)
    let foundOpt = optionsarray.find(function(option)
    {return option.value === e.target[0].value})
    
    let data = {user_id: foundOpt.dataset.id,
        playlist_id: playlist.id
    }
    fetch(user_playlist_url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(newUser => {
        debugger
        console.log(newUser.user_id)
    })

}



function musicButton(){
    const songButt = document.querySelector('.music')
    songButt.addEventListener('click', () => {
        content.innerHTML = '',
        fetchSongs()
    })
}





})
