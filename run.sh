#!/bin/bash -x

# build the client
cd client
yarn build
cd ..

# (re)start the server
cd server
python3 -m venv .venv
source ./.venv/bin/activate
pip install -r requirements.txt
nohup python server.py 2> /dev/null &

echo "Application Restarted"
