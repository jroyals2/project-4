Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
 
  namespace :api do

  resources :users do
    resources :tailgate_events do
      resources :tailgate_members
    end
  end

  resources :events

  end
end
