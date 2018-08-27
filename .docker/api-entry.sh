#!/bin/bash
set -e # Exit on fail
echo "===== BEGINNING API SETUP ====="

# Check for exisiting client folder, if none copy create-react-app from container to mounted client /dir
# Ensures all users start with the same cached version of CRA/react-scripts
if [ -z "$(ls -A /root/api)" ]; then
  echo "===== DIRECTORY /api NOT FOUND, COPYING PROJECT STARTER ====="
  cp -r /app_lock/rr_api/* /root/api # Clone project to api bind volume
  rm /root/api/README.md # Remove README to avoid multiples in project
fi

# Change to rails project directory
cd /root/api

# Ensure all gems installed. Add binstubs to bin which has been added to PATH in Dockerfile.
echo "===== CHECKING STATUS OF BUNDLE ====="
bundle check || bundle install --binstubs="$BUNDLE_BIN"

#Check if there is already a copy of the book in the lib directory
if [ -z "$(ls -A /root/api/lib/reactivating-rails)" ]; then
  echo "===== BOOK MARKDOWN NOT FOUND, CLONING LATEST COPY ====="
  # Clone latest copy of book of lib directory
  git clone https://github.com/swachtma/reactivating-rails.git /root/api/lib/reactivating-rails
fi

# Setup databases if needed and run any new migrations
rails db:create
rails db:migrate

# Change to api root so bash start containers in application root on CMD override
cd /root/api

# Finally call command issued to the docker service
exec "$@"