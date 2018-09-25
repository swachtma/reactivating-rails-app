Rails.application.routes.draw do
  namespace :api do
    get 'nodes/', to: "nodes#index"
    get 'chapters/', to: "chapters#index"
  end
end