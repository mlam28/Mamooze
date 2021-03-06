document.addEventListener('click', documentClick, true)
let headerCont = document.getElementById('head-container')
let headH2 = document.createElement('h2')
headH2.innerText = "All Songs"
headH2.className = 'head'
headerCont.appendChild(headH2)

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
        let playlist_form_div = document.querySelector('div #clicked')
        playlist_form_div.id = ''
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

// end of checking if you are clicking on somewhere that is not part of a form in order to close the form. ////////

function getSongsArray(){
    let songsArray = []
    let songs = document.getElementsByClassName('song-card')
    Array.from(songs).forEach(song => {
        let obj = {}
        obj.name = song.dataset.song_name
        obj.artist = song.dataset.song_artist
        obj.url = song.dataset.song_url
        obj.song_cover = song.dataset.song_cover
        songsArray.push(obj)
    })
    return songsArray
   }

document.addEventListener("DOMContentLoaded", function(){
    currentUser = 0
    let logoutButt = document.getElementById('logout-button') 
    logoutButt.style.display = 'none'
    console.log('everything loaded')
const container = document.querySelector('#content-container')
const player = document.querySelector('#music-player')
const playlist_button = document.querySelector('#playlist-button')
const playlist_form = document.querySelector('#add-song-to-playlist')
const homeButt = document.querySelector('.home')
const songsButt = document.querySelector('.music')

playlist_button.style.display = 'none'
homeButt.style.display = 'none'
songsButt.style.display = 'none'

const song_url = 'http://localhost:3000/songs'
const user_url = 'http://localhost:3000/users'
const playlist_url = 'http://localhost:3000/playlists/'
const user_playlist_url = 'http://localhost:3000/user_playlists/'
const song_playlist_url = 'http://localhost:3000/song_playlists/'

fetchSongs()
musicButton()

function loginUser(e){
     e.preventDefault()
       username = form.querySelector('input').value
       
    fetch(user_url).then(resp => resp.json()).then(users => {console.log(users); 
        
       let foundUser = users.find(function(user) {
        return user.username === username
    });

   if (foundUser){
    displayUser(foundUser);
    currentUser = foundUser
   } else {
    alert('that user does not exist.')
    document.querySelector("#login-form")[0].value = ''
   }

})
    }


function songHeaders(){

    let songHeaderDiv = document.createElement('div')
    songHeaderDiv.classList.add('row')
    songHeaderDiv.id = 'song-headers'

    let playbttnDiv = document.createElement('div')
    playbttnDiv.classList.add('col-sm')
    let playSpan = document.createElement('span')
    playSpan.innerText = '#'
    playbttnDiv.appendChild(playSpan)
    songHeaderDiv.appendChild(playbttnDiv)

    let titleDiv = document.createElement('div')
    titleDiv.classList.add('col-sm')
    let titleSpan = document.createElement('span')
    titleSpan.innerText = 'Title'
    titleDiv.appendChild(titleSpan)
    songHeaderDiv.appendChild(titleDiv)
    
    
    let artistDiv = document.createElement('div')
    artistDiv.classList.add('col-sm')
    let artistSpan = document.createElement('span')
    artistSpan.innerText = 'Artist'
    artistDiv.appendChild(artistSpan)
    songHeaderDiv.appendChild(artistDiv)

    let addbttn = document.createElement('div')
    let addSpan = document.createElement('span')
    addSpan.innerText = "Add"
    addbttn.append(addSpan)
    addbttn.classList.add('col-sm')
    songHeaderDiv.appendChild(addbttn)
    
    container.appendChild(songHeaderDiv)

    let pH3 = document.querySelector('h3')
    if(!!currentUser && !!pH3) {
        let delDiv = document.createElement('div')
        delDiv.classList.add('col-sm')
        let delSpan = document.createElement('span')
        delSpan.innerText = '#'
        delDiv.appendChild(delSpan)
        songHeaderDiv.appendChild(delDiv)
    }

 }

function fetchSongs(){
    songHeaders()
    fetch(song_url).then(resp => resp.json()).then(songs => {console.log(songs); songs.forEach(displaySong)})
}


function displaySong(song){

    let songDiv = document.createElement('div')
    songDiv.classList.add('song-card', 'row')
    songDiv.dataset.song_url = song.url
    songDiv.id = song.name
    songDiv.dataset.song_name = song.name
    songDiv.dataset.song_artist = song.artist
    songDiv.dataset.song_cover = song.cover_url
<<<<<<< HEAD
    
=======
>>>>>>> stylezzz
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
   playlist_form_div.dataset.song_id = song.id
   playlistDiv.appendChild(playlist_form_div)
   
   songDiv.appendChild(playlistDiv)
   if (currentUser !== 0){
   addToPlaylist.addEventListener('click', (e) => fetchFormPlaylist(e, playlist_form_div) )
   }
   // delete button
let pH3 = document.querySelector('h3')
if(!!currentUser && !!pH3){
       let deleteIcon = document.createElement('i')
       let deleteDiv = document.createElement('div')
       deleteDiv.className = 'col-sm'
        deleteIcon.classList.add('far', 'fa-trash-alt')
        songDiv.appendChild(deleteDiv)
       deleteDiv.appendChild(deleteIcon)
       deleteDiv.dataset.song_id = song.id

       deleteIcon.addEventListener("click", (e) => deleteSong(e, songDiv))
}
}

function deleteSong(e, songDiv){
    let data = {
        song_id: e.target.parentElement.dataset.song_id,
        // songDiv.children[4].dataset.song_id
        playlist_id: songDiv.parentElement.children[1].dataset.id
    }
        fetch('http://localhost:3000/song_playlists' , {
         method: 'DELETE',
         body: JSON.stringify(data),
         headers: {
             'Content-Type': 'application/JSON'
            }
         })
         .then(res => res.json())
         .then( (bye) => {
            alert(bye.message)
         }
         )
          document.getElementById(songDiv.id).remove()
        }
         
         



function playMusic(e, song){
    player.innerHTML = ''
    let audio = document.createElement('audio')
    audio.controls = true
    audio.autoplay = true
    audio.src = song.url
    audio.classList.add('container-fluid')
    player.classList.add('fixed-bottom')
    player.appendChild(audio)

    // create card next to audio 
    let cardDiv = document.createElement('div')
    cardDiv.classList.add('card', 'music-card')
    cardDiv.id = 'music-player-card'
    let songImg = document.createElement('img')
    songImg.src = song.cover_url
    songImg.classList.add('car-img-top', "cover-image")
    cardDiv.appendChild(songImg)
    let cardBodyDiv = document.createElement('div')
    cardBodyDiv.classList.add('card-body')
    cardDiv.appendChild(cardBodyDiv)

    let cardTitle = document.createElement('h7')
    cardTitle.style.display = 'block'
    cardTitle.innerText = `${song.name} / ${song.artist}`
    cardBodyDiv.appendChild(cardTitle)

    let forward = document.createElement('i')
    forward.classList.add('fas', 'fa-step-forward')
    let backward = document.createElement('i')
    backward.classList.add('fas', 'fa-step-backward')
    cardBodyDiv.appendChild(backward)
    cardBodyDiv.appendChild(forward)
    player.insertBefore(cardDiv, audio)
    let songs = getSongsArray()
    
    forward.addEventListener('click', (e) => forwardSong(e, songs))
    backward.addEventListener('click', (e) => backwardSong(e, songs))
    audio.addEventListener('ended', (e) => nextSong(e, songs))
    
}

function nextSong(e, songs){
    console.log('ended')

    let song_obj = songs.find(function(obj){
        return obj.url === e.target.src
    })
    let song_index = songs.indexOf(song_obj) 
    
    e.target.src = songs[song_index += 1].url
    
   let cardDiv = e.target.parentElement.children[0]
   cardDiv.querySelector('img').src = songs[song_index].song_cover
   cardDiv.querySelector('div h7').innerText = `${songs[song_index].name} / ${songs[song_index].artist}`
    
}

function forwardSong(e, songs){
    console.log('next song please')
    let audio = document.querySelector('audio')
    let cardDiv = document.querySelector('#music-player-card')
    let song_obj = songs.find(function(obj){
        return obj.url === audio.src
    })
    let song_index = songs.indexOf(song_obj) 
    
    audio.src = songs[song_index += 1].url
    
   cardDiv.querySelector('img').src = songs[song_index].song_cover
   cardDiv.querySelector('div h7').innerText = `${songs[song_index].name} / ${songs[song_index].artist}`
}

function backwardSong(e, songs){
    let audio = document.querySelector('audio')
    let cardDiv = document.querySelector('#music-player-card')
    let song_obj = songs.find(function(obj){
        return obj.url === audio.src
    })
    let song_index = songs.indexOf(song_obj) 
    
    audio.src = songs[song_index -= 1].url
    
   cardDiv.querySelector('img').src = songs[song_index].song_cover
   cardDiv.querySelector('div h7').innerText = `${songs[song_index].name} / ${songs[song_index].artist}`
}



function fetchFormPlaylist(e, playlist_form_div){
    let user_id = document.querySelector('#user').dataset.user_id
   
    fetch(`${user_url}/${user_id}`).then(resp => resp.json()).then(user => {console.log(user);
        showPlaylistForm(user)
    })
    playlist_form_div.id = 'clicked'
   
}

let showPlaylistForm = (user) => {
    console.log('hit form toggle')
    let divToDelete = document.createElement('div')

    let playlist_form = document.createElement('form')
    playlist_form.classList.add('playlist-form')
   playlist_form.innerHTML =  "<div class='form-group'><input type='text' name='playlist-name' placeholder='Name for New Playlist'></div><div class='form-group' id='playlist-select'><label>Or, add to existing:</label><select><option disabled selected value>--- select an option ---</option></select></div><input class='btn btn-primary' type='submit' value='Add'>"

   if (user.playlists){
    user.playlists.forEach(playlist => {
    let selectTag = playlist_form.querySelector('select')
    let optionTag = document.createElement('option')
    optionTag.value = playlist.id
    optionTag.innerText = playlist.name
    selectTag.appendChild(optionTag)
   })
}

 
   divToDelete.appendChild(playlist_form)
   let playlist_form_div = document.querySelector('#clicked')
   playlist_form_div.appendChild(divToDelete)
  
   playlist_form.addEventListener('submit', managePlaylistForm)

}


function managePlaylistForm(e){
console.log('hit playlist submit')
e.preventDefault()
    let songId = e.target.parentElement.parentElement.dataset.song_id
    let userId = currentUser.id
    let selectTag = e.currentTarget.querySelector('select')
  let option_value = e.currentTarget.querySelector('select').value
  let new_playlist_value = e.currentTarget.querySelector('input').value

        function checkFull(){
        return (option_value !== "") && (new_playlist_value !== "")
        }

        function checkEmpty(){
        return  (option_value === "") && (new_playlist_value === "")
        }



  if(checkFull() || checkEmpty()){
      alert('Please fill in one or the other, but not both.')
      selectTag.value = ''
      
  } else if (option_value !== "") {
    fetch('http://localhost:3000/song_playlists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({song_id: songId , playlist_id: option_value})
    }).then(resp => resp.json()).then(data => {console.log(data);  document.querySelector('.playlist-form').parentNode.remove()})

  } 
  else if (new_playlist_value !== "") {
    fetch('http://localhost:3000/playlists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({name: new_playlist_value, song_ids: [songId], user_ids: [userId]})
    })
    document.querySelector('.playlist-form').parentNode.remove()
  }
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


    
    function displayUser(user){
        let h2 = document.createElement('h2')
        h2.id = 'user'
        h2.innerText = `Welcome, ${user.username}`
        h2.dataset.user_name = user.username
        h2.dataset.user_id = user.id
        user_id = user.id
        let title = document.querySelector('#site-title')
        title.appendChild(h2)

        toggle_login = !toggle_login
        form.style.display = 'none'

        login_button.style.display = 'none'
        logoutButt.style.display = 'block'


        let playlist_button = document.querySelector('#playlist-button')
        playlist_button.style.display = 'block'
        homeButt.style.display = 'block'
        songsButt.style.display = 'block'
        playlist_button.addEventListener("click", (e) => {fetchUser(e, user_id)})

       displayPage(user)
       renderHome()
    //    displayPlaylists(user)

       logoutButt.addEventListener('click', logout)
     

    }

    function fetchUser(e, user_id){
        fetch(`${user_url}/${user_id} `).then(resp => resp.json()).then(user => displayPlaylists(user))
    }

   

    function logout(e){
        let navH2 = document.querySelector('h2')
            navH2.remove()
            content.innerHTML ='', 
            headerCont.innerHTML = ''
            form.style.display = 'block'
            e.target.style.display = 'none'
            playlist_button.style.display = 'none'
            homeButt.style.display = 'none'
            songsButt.style.display = 'none'
            login_button.style.display = 'block'
            form[0].value = ''
            currentUser = 0
            fetchSongs()  
            let headH2 = document.createElement('h2')
            headH2.innerText = "All Songs"
            headH2.className = 'head'
            headerCont.appendChild(headH2)
    }

    function displayPage(user){
     let songCard =  document.querySelectorAll('.song-card')
     songCard.forEach(song =>  song.style.display = 'none')
     
    }       
          
 let content = document.getElementById('content-container')

    function displayPlaylists(user){
        content.innerHTML = ""
        headerCont.innerHTML = ""
        let phead = document.createElement('h2')
        phead.innerText = "My Playlists"
        phead.classList.add('head')
        headerCont.appendChild(phead)
         user.playlists.forEach((playlist) => {
           let playlistDiv = document.createElement('div')
           playlistDiv.className ='card'
           let playlistImg = document.createElement('img') 
           playlistImg.src = playlist.image_url
           playlistImg.className = 'car-img-top'
           let cardBodyDiv = document.createElement('div')
           cardBodyDiv.classList.add('card-body', 'playlist-card')
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
        listH3.dataset.id = playlist.id
        listH3.innerText = playlist.name
        listDiv.appendChild(listH3)
        let plist = document.querySelectorAll('.playlist-card')
      
     plist.forEach((list) => {
        if (list.innerText === playlist.name){
            let pImg = document.createElement('img') 
             pImg.src = playlist.image_url
             content.innerHTML = ""
             headerCont.innerHTML = ''
             plistHead = document.createElement('h2')
             plistHead.innerText = playlist.name
             content.append(pImg, listH3)
             songHeaders()
         playlist.songs.forEach((song) => {
         displaySong(song)})
         
        }
        else{      
             list.style.display = 'none'               
        }
        })

        let collabDiv = document.createElement('h6')
        collabDiv.className = "h6Div"
        listH3.append(collabDiv)
        collabDiv.innerText = 'Playlist Collaborators: '

        playlist.users.forEach((user) => {
            let collabList = document.createElement('p')
            if(user.username !== username){
            collabList.innerText = `${user.username}-`
            collabList.className = 'collablist'
            collabDiv.append(collabList)}
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
        .then((users) => { 
            // const newplaylist = playlist
            users.forEach((user) => {
             let option = document.createElement('option')
            dataList.append(option)
            if(username !== user.username){ 
                option.value = user.username
                option.dataset.id = user.id
            }
        })
        //   newplaylist.users.forEach((user) =>{
        //         if(!user.username){
        //             option.value = user.username
        //             option.dataset.id = user.id
        //         }
        //     })
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
        console.log(newUser)
        if (newUser.message){
            alert(newUser.message)
            document.querySelector('#colform')[0].value = ''
        }
            let collabList = document.createElement('p')
            collabList.innerText = `${e.target[0].value}-`
            collabList.className = 'collablist'
            document.querySelector(".h6Div").append(collabList)
            document.querySelector('#colform')[0].value = ''
        
})
}



function musicButton(){
    const songButt = document.querySelector('.music')
    songButt.addEventListener('click', () => {
        content.innerHTML = '',
        headerCont.innerHTML = ''
        fetchSongs()
        let headH2 = document.createElement('h2')
        headH2.innerText = "All Songs"
        headH2.className = 'head'
        headerCont.appendChild(headH2)
    })
}

let homeButton = document.querySelector('.home')
    homeButton.addEventListener("click", renderHome)

    function renderHome(){
        content.innerHTML = ""
        headerCont.innerHTML = ''
        let publicHead = document.createElement('h2')
        publicHead.innerText = "Public Playlists"
        publicHead.classList.add('head')
        headerCont.appendChild(publicHead)
        fetch('http://localhost:3000/public_playlists')
        .then(res => res.json())
        .then((playlists) => {
            
            playlists.forEach((playlist) => {
                console.log(playlist)
<<<<<<< HEAD
                
=======
>>>>>>> stylezzz
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
           
           playlistImg.addEventListener('click', (e) => {showPublicPlaylistSongs(e, playlist)}, {once : true});
           cardText.addEventListener('click', (e) => {showPublicPlaylistSongs(e, playlist)}, {once : true});
            })
        })

}


function showPublicPlaylistSongs(e, playlist){
    let listDiv = document.createElement('div')
    let listH4 = document.createElement('h4')
    listH4.dataset.id = playlist.id
    listH4.innerText = playlist.name
    listDiv.appendChild(listH4)
    let plist = document.querySelectorAll('.card-body')
    
 plist.forEach((list) => {
    if (list.innerText === playlist.name){
        let pImg = document.createElement('img') 
         pImg.src = playlist.image_url
         content.innerHTML = ""
         content.append(pImg, listH4)
         headerCont.innerHTML = ''
        let publicHead = document.createElement('h2')
        publicHead.innerText = "Public Playlists"
        publicHead.classList.add('head')
        headerCont.appendChild(publicHead)
        songHeaders()
    //      
     playlist.songs.forEach((song) => {
     displaySong(song)})
     
    }
    else{      
         list.style.display = 'none'               
    }
    })
}



})

// end of DOMCONTENTLOADED

