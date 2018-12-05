# Creating the Production Swarm

Instruction for working with Docker in development and production environments when managing this project.

## Install Docker

```
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

## Setting up a new swarm

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

If you are creating a new swarm, you need to activate swarm mode with `docker swarm init --advertise-addr <droplet public IP>`.

## Docker Secrets

When creating a new swarm, execute the following command to create the needed Docker Secrets.  Find these values in LastPass Secure Notes.

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

Push new container to the registry: `docker push registry.gitlab.com/swachtma/reactivating-rails-app:latest`

When creating new images, update reactivating-rails:latest, and create a new versioned image (reactivating-rails-app:x.x.x).

## Running Containers in Dev

Docker-Compose is set up to use the production Dockerfile locally to build the dev environment from a shared production Dockfile.  Start all development services with `docker-compose up` from the project's root directory.

## Starting the Production Stack

After completing all the steps above, the stack can be brought online in production with the following commands.  First, clone the latest project files: `git clone https://github.com/swachtma/reactivating-rails-app.git`.

Then, create the stack; `docker stack deploy -c .docker/docker-compose.yml rr`

## Updating Book Markdown

The script `api-entry.sh` is an entry point for the dev-api container and the production container.  In production, the container checks for an updated master commit from the book's public GitHub repo.  Each time the production service starts, the container clones the latest book text and Rake tasks `rr:clear_book` and `rr:load_book` run to clear old content and reset indexes for relevant tables.

In development, this behavior happens only when an `api/lib/reactivating-rails` directory is missing locally.  This design prevents users who are reading the book and following along in a local project from unexpectedly receiving an update mid-read.