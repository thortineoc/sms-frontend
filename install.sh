#!/bin/bash


sed -i 's/52.142.201.18/localhost/g' public/keycloak.json
sed -i 's/52.142.201.18/localhost/g' src/configuration.json
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get update
sudo apt-get -y install npm
sudo npm install -g serve
npm install
npm run build

