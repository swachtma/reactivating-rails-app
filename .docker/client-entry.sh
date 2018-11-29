#!/bin/bash
set -e # Exit on fail
echo "===== BEGINNING CLIENT SETUP ====="

# Check for exisiting client folder, if none is found copy create-react-app from
# container to mounted client directory so all users start with the same react-scripts
if [ -z "$(ls -A /root/client)" ]; then
   echo "===== DIRECTORY /client not found, copying project starter ====="
   cp -r /app_lock/rr_client/* /root/client
fi

# Check installation has current node_modules
echo "===== CHECKING PACKAGE INSTALLATIONS ====="
echo "This may take a moment if it is your first run . . ."
yarn install

exec "$@"
# Finally call command issued to the docker service
