#!/bin/bash
set -e # Exit on fail
echo "===== BEGINNING CLIENT SETUP ====="

# Check for exisiting client folder, if none copy create-react-app from container to mounted client /dir
# Ensures all users start with the same cached version of CRA/react-scripts
if [ -z "$(ls -A /root/client)" ]; then
   echo "===== DIRECTORY /client not found, copying project starter ====="
   cp -r /client_cache/* /root/client
fi

# Check installation has current node_modules
echo "===== CHECKING PACKAGE INSTALLATIONS ====="
echo "This may take a moment if it is your first run . . ."
yarn install

echo "===== STARTING CLIENT DEV SERVER  ====="
exec "$@"
# Finally call command issued to the docker service
