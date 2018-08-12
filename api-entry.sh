#!/bin/bash
set -e # Exit on fail
echo "===== BEGINNING API SETUP ====="

# Check for exisiting client folder, if none copy create-react-app from container to mounted client /dir
# Ensures all users start with the same cached version of CRA/react-scripts
if [ -z "$(ls -A /root/api)" ]; then
   echo "===== DIRECTORY /api NOT FOUND, COPYING PROJECT STARTER ====="
   cp -r /api_cache/* /root/api
fi

# Change to rails project directory
cd /root/api

# Ensure all gems installed. Add binstubs to bin which has been added to PATH in Dockerfile.
echo "===== CHECKING STATUS OF BUNDLE ====="
bundle check || bundle install --binstubs="$BUNDLE_BIN"

# Clone latest copy of book of lib directory
cd /root/api/lib/
rm -rf reactivating-rails/
git clone https://github.com/swachtma/reactivating-rails.git


# Setup databases if needed and run any new migrations
rails db:create
rails db:migrate

# Finally call command issued to the docker service
exec "$@"

