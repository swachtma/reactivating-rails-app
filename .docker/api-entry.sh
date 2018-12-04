#!/bin/bash
set -e # Exit on fail
echo "===== BEGINNING API SETUP ====="

# Script check bundle and updates as needed when user in dev
# controlled by ENV set in Dockerfile --target=api-dev
if [ $BUNDLE_ON_START == 1 ]; then 
  echo "===== STARTING IN DEV, CHECKING BUNDLE ====="
  bundle check || bundle install
fi

# Clone latest copy of book if one is not populated.  
# Always on production container start.
# Only on first dev docker-compose up unless user deletes book directory
if [ -z "$(ls -A /root/api/lib/reactivating-rails)" ]; then
  echo "===== BOOK MARKDOWN NOT FOUND, CLONING LATEST COPY ====="
  # Clone latest copy of book of lib directory
  git clone https://github.com/swachtma/reactivating-rails.git /root/api/lib/reactivating-rails
fi

# Setup databases if needed and run any new migrations
bin/rails db:create
bin/rails db:migrate

# Clear book from database and reset indexes for Node and Chapter tables
if [ "$(rake -T | grep rr:clear_book)" ]; then bin/rails rr:clear_book; fi;
if [ "$(rake -T | grep rr:load_book)" ]; then bin/rails rr:load_book; fi

# Remove any existing server process ID files from tmp/pids/
rm -f tmp/pids/* || true 

# Call start command issued passed to Docker.
exec "$@"