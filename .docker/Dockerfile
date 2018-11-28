# BUILD STAGE: CLIENT-DEV 
FROM node:8 as client-dev

# Create a local copy of a CRA app in the container.  This ensure each created container
# will use the same version of CRA and more specifically, react-scripts.
RUN npx create-react-app /app_lock/rr_client
RUN rm -rf /app_lock/rr_client/node_modules

# Overwrite stored package.json file with docker settings 
COPY ./.docker/init_package.json /app_lock/rr_client/package.json

# Set working directory to Client root, so bash CMD override starts in client context.
WORKDIR /root/client

# Copy startup script to container root and set as entrypoint
COPY ./.docker/client-entry.sh /client-entry.sh
RUN chmod +x /client-entry.sh
ENTRYPOINT [ "/client-entry.sh" ]

CMD ["bash"]

# BUILD STAGE: API-BASE
FROM ruby:2.5.1 as api-base
# Install update and install cmake for gemfile dependencies
RUN apt-get update
RUN apt-get install -y cmake
RUN gem install rails -v 5.2.0

# BUILD STAGE: API-DEV
FROM api-base as api-dev

# Create an empty default app to provide base dependcies (Gemfile)
# Generated application is placed parralel to the /root directory
RUN rails new /app_lock/rr_api --api -T --database=postgresql --skip-bundle --skip-git

# Overwrite stored database config with docker settings 
# Copies a Rails DB config preset with host values for docker-compose networking
COPY ./.docker/init_database.yml /app_lock/rr_api/config/database.yml

# MAY NOT NEED THIS LAYER
# Set working directory to API root, so bash CMD override starts in rails context.
# WORKDIR /root/api

# Copy startup script to container root and set as entrypoint
COPY ./.docker/api-entry.sh /api-entry.sh
RUN chmod +x /api-entry.sh
ENTRYPOINT [ "/api-entry.sh" ]

CMD ["bash"]

# BUILD STAGE: PRODUCTION
FROM ruby:2.5.1 as prod

# Install cmake for a gemfile dependency
RUN apt-get update && \
apt-get install -y cmake
# gem install rails -v 5.2.0

# Set working directory to API root, so bash CMD override starts in rails context.
WORKDIR /root

# Clone latest project code &  collapse directory path
RUN git clone https://github.com/swachtma/reactivating-rails-app.git
RUN mv reactivating-rails-app/* . && \
rm reactivating-rails-app -rf

# Change to API directory and install gems
WORKDIR /root/api
RUN bundle install

# Change to client dir and yarn install
#WORKDIR /root/client
#RUN docker-compose exec client yarn install

# Build client-side app


# Copy startup script to container root and set as entrypoint
# COPY ./.docker/api-entry.sh /api-entry.sh
# RUN chmod +x /api-entry.sh
# ENTRYPOINT [ "/api-entry.sh" ]

CMD ["bash"]