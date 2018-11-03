Rails.application.routes.draw do
  namespace :api do
    get 'github/', to: "authentication#github", format: false
    get 'hydrate_user/', to: "authentication#show"
    get 'nodes/', to: "nodes#index"
    get 'chapters/', to: "chapters#index"
  end
end