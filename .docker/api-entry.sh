#!/bin/bash
set -e # Exit on fail
echo "===== BEGINNING API SETUP ====="

# Check for an exisiting api/ folder, brought by a bind mount from user's local
# If no local progect found; copy app-lock starter from container to mounted api/ directory
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

# Check if there is already a copy of the book in the lib directory
if [ -z "$(ls -A /root/api/lib/reactivating-rails)" ]; then
  echo "===== BOOK MARKDOWN NOT FOUND, CLONING LATEST COPY ====="
  # Clone latest copy of book of lib directory
  git clone https://github.com/swachtma/reactivating-rails.git /root/api/lib/reactivating-rails
fi

# Setup databases if needed and run any new migrations
bin/rails db:create
bin/rails db:migrate

# Remove any existing server process ID files from tmp/pids/ these files can be orphaned 
# when docker-compose down terminates the API container with Puma running.  Preeventing server 
# start on the next docker-compose up
rm -f tmp/pids/* || true 

# Call start command issued passed to Docker.
exec "$@"