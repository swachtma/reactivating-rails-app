Rails.application.routes.draw do
  scope :api do
    get 'github/', to: "authentication#github", format: false
    get 'hydrate_user/', to: "authentication#show"
    get 'nodes/', to: "nodes#index"
    get 'chapters/', to: "chapters#index"
    resources :bookmarks, only: [:index, :create]
  end
end