# BUILD STAGE: CLIENT-BASE
  FROM node:8 as client-base

  # Copy package.json and lock file with docker settings 
  COPY ./client/package.json /root/client/package.json
  COPY ./client/yarn.lock /root/client/yarn.lock

  # Set working directory to Client root, so bash CMD override starts in client context.
  WORKDIR /root/client

  # Install Node modules
  RUN yarn install

  # Copy client application files
  COPY ./client /root/client

  # Start with default command "bash", overwritten as "yarn start" in compose
  CMD ["bash"]

# BUILD STAGE: CLIENT-BUILD
  FROM client-base as client-build

  # Create production build
  RUN yarn build

# BUILD STAGE: API-BASE

  FROM ruby:2.5.1 as api-base
  # Install update and install cmake for gemfile dependencies
  RUN apt-get update
  RUN apt-get install -y cmake

  # Copy Gemfile and lock to image
  COPY ./api/Gemfile /root/api/Gemfile
  COPY ./api/Gemfile.lock /root/api/Gemfile.lock

  # Copy client application files
  COPY ./api /root/api

  # Change to API directory
  WORKDIR /root/api 

  # Copy startup script to container root and set as entrypoint
  COPY ./.docker/api-entry.sh /api-entry.sh
  RUN chmod +x /api-entry.sh
  ENTRYPOINT [ "/api-entry.sh" ]
  
# BUILD STAGE: API-DEV
  FROM api-base as api-dev

  # Set flag in api-entry.sh to check bundle on container start
  ENV BUNDLE_ON_START=1

  # Default to bash when starting container directly, bin/rails server in compose
  CMD ["bash"]

# BUILD STAGE: PRODUCTION

  FROM api-base as prod

  # Copy client build for client-build container to prod container
  COPY --from=client-build /root/client/build /root/public

  CMD ["bin/rails", "server"]