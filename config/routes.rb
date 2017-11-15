Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
 
  namespace :api do
    resources :tailgate_events do
       resources :tailgate_members
    
  end

  resources :events 

  end
  get 'events/:event_Id/tailgates', to: 'event#show'
  resources :users
end
