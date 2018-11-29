# BUILD STAGE: CLIENT-BASE
  FROM node:8 as client-base

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

# BUILD STAGE: CLIENT-BUILD
  FROM node:8 as client-build

  COPY ./client /root/client
  WORKDIR /root/client
  RUN yarn install
  RUN yarn build

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

  # Copy startup script to container root and set as entrypoint
  COPY ./.docker/api-entry.sh /api-entry.sh
  RUN chmod +x /api-entry.sh
  ENTRYPOINT [ "/api-entry.sh" ]

  CMD ["bash"]

# BUILD STAGE: PRODUCTION

  FROM api-base as prod

  # Set working directory to API root, so bash CMD override starts in rails context.
  WORKDIR /root

  # Copy local API files to container 
  COPY ./api/ /root/

  # Change to API directory and bundle install
  RUN bundle install

  # Copy client build for client-build container to prod container
  COPY --from=client-build /root/client/build /root/public

  CMD ["bin/rails", "server"]