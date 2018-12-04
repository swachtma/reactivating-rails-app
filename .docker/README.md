# Creating the Production Swarm

Notes on working with Docker in development and production environments when managing this project.

## Install Docker

```
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

### Setting up a new swarm

First, install the DO storage driver:

```
curl -sSL https://rexray.io/install | sh
```

```
docker plugin install rexray/dobs \
  DOBS_REGION=nyc1 \
  DOBS_TOKEN=<token value> \
  DOBS_CONVERTUNDERSCORES=true
```

Volumes can automatically be created and attached to the droplet/node by calling the rexrays/dobs driver to create standalone volumes: `docker volume create --driver rexray/dobs --name pgdata`

## Bringing the Swarm Online

If you are creating a new swarm, you will need to activate swarm mode with `docker swarm init --advertise-addr <droplet public IP>`.

## Docker Secrets

When recreating a new swarm you will need to execute the following command to create the needed Docker Secrets.  These values are stored in LastPass Secure Notes.

```
echo -n "" | docker secret create pg_database -
echo -n "" | docker secret create pg_user -
echo -n "" | docker secret create pg_password -

echo -n "" | docker secret create github_client_id -
echo -n "" | docker secret create github_client_secret -

echo -n "" | docker secret create jwt_secret -
```

## Updating Private Container Registry

Creating new version of production docker images: `docker build -f .docker/Dockerfile --target prod -t registry.gitlab.com/swachtma/reactivating-rails-app:latest .`

Push new container to registry: `docker push registry.gitlab.com/swachtma/reactivating-rails-app:latest`

When creating new images, update reactivating-rails:latest, and create a version image (reactivating-rails-app:1.x.x).

## Running Containers in Dev

Docker compose is setup to use the production Dockerfile locally to build the dev environement from a shared production Dockfile.  Start all development services with `docker-compose up` from the project's root directory.

## Starting the Production Stack

The stack can be brought online in production with the following commmands once the steps above are completed.  First, clone the latest project files: `git clone https://github.com/swachtma/reactivating-rails-app.git`.

Then, create the stack; `docker stack deploy -c .docker/docker-compose.yml rr`

## Updating Book Markdown

The script `api-entry.sh` is an an entrypoint for the dev-api container and the production container.  In production, the container will check for an updated master from the book's public GitHub repo.  The latest copy is cloned each time the production service starts, and Rake task `rr:clear_book` and `rr:load_book` are run to clear old content and reset indexes for relevant tables.

In development this behavior happens only when an `api/lib/reactivating-rails` directory is not found locally.  This prevent users reading the book and following along in a local project from unexpectedly recieving an update to the book while mid-read.