# Covid-19 Risk Analysis Client
Application that calculates the risk of hospitalization due to a covid-19.

# Prequisiste

- python 3
- node 14.x or better
- yarn

# Build & Run

### Development

**Start the client**
```
cd client
yarn
yarn run start
```

**Start the server**
```
cd server
python3 -m venv .venv
source ./.venv/bin/activate
pip install -c requirements.txt
python main.py
```

### Docker compose

docker-compose up --build
