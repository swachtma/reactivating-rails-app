#!/bin/bash
set -e # Exit on fail
echo "===== BEGINNING PROD SETUP ====="

# Change to rails project directory
rm -rf /root/lib/reactivating-rails
git clone https://github.com/swachtma/reactivating-rails.git /root/lib/reactivating-rails

# Setup databases if needed and run any new migrations
bin/rails db:create
bin/rails db:migrate
bin/rails rr:clear_book
bin/rails rr:load_book

# Remove any existing server process ID files from tmp/pids/
rm -f tmp/pids/* || true 

# Call start command issued passed to Docker.
exec "$@"