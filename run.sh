#!/bin/bash

npm install
npm run build
npx serve -s build -l 24010 &

