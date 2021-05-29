#!/bin/bash

sudo apt-get update
sudo apt-get -y install npm
sudo npm install -g serve
npm install
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
npm run build

