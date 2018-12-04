# Creating the Production Swarm

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
  DOBS_TOKEN=218a36bc6810a5f38ac18970acdfecb06bf25c3464cb575ba28f66a9f3b0d169 \
  DOBS_CONVERTUNDERSCORES=true
```

Volumes can automatically be created and attached to the droplet/node by calling the rexrays/dobs driver to create standalone volumes: `docker volume create --driver rexray/dobs --name rrpgdata`

## Docker Secrets

When recreating a new swarm you will need to execute the following command to create the needed Docker Secrets.  These are stored in your LastPass Secure Notes.

```
echo -n "reactivating_rails_prod" | docker secret create pg_database -
echo -n "reactivating_rails_admin" | docker secret create pg_user -
echo -n "2Eyj1eQ0z6syq6v25UBIHlDWZIUKEVqLyTxN5lcIk" | docker secret create pg_password -

echo -n "81fc568e20ee9f3f7105" | docker secret create github_client_id -
echo -n "8c29037525f5b6d500490f969f0251e944f83325" | docker secret create github_client_secret -

echo -n "HDua4O" | docker secret create jwt_secret -
```

## Bringing the Swarm Online

If you are creating a new swarm, you will need to activate swarm mode with `docker swarm init --advertise-addr <droplet public IP>`.  Currently this is: `docker swarm init --advertise-addr 68.183.115.152`.

docker service create --name pgdb \
    --secret postgres_user_file \
    --secret postgres_password_file \
    --detach false \
    postgres:10-alpine

## Deploying Private Container

Log into canister.io from the command line to enable pulling privdocker login --username=<value> --password-stdin=<value> cloud.canister.io:5000ate docker containers: ``