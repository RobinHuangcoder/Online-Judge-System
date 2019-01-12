#!/bin/bash
fuser -k 3000/tcp

docker run -p 6379:6379 25b76b03f13c
cd ./oj-server
npm install
nodemon server.js &
cd ../oj-client
npm install
ng build --watch

echo "===================================================="
read -p "PRESS [ENTER] TO TERMINATE PROCESS." PRESSKEY

fuser -k 3000/tcp
docker stop 25b76b03f13c