Rails.application.routes.draw do
<<<<<<< HEAD
  resources :song_public_playlists
  resources :public_playlists
  resources :song_playlists
=======
  resources :song_playlists, only: [:index, :create, :show, :update]
  delete '/song_playlists', to: 'song_playlists#destroy'
>>>>>>> origin/deletebutt
  resources :user_playlists
  resources :songs
  resources :playlists
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
