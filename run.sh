#!/bin/bash

DIRNAME=dirname "$0"

# build the client
cd client
yarn build

# (re)start the server
cd $DIRNAME
cd server
python3 -m venv .venv
source ./.venv/bin/activate
pip install -r requirements.txt
nohup python server.py 2> /dev/null &

echo "Application Restarted"

