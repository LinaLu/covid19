# Covid-19 Risk Analysis Client

Application that calculates the risk of dying in the case of catching a covid-19 infection.

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
pip install -r requirements.txt
python main.py
```
## Test an endpoint
```
$ curl -X POST "http://localhost:5000/api/risk" -H "Content-Type: application/json" -d '{"age": 90}' | jq
```

### Docker compose

docker-compose up --build

# Project summary

## Data ##
The raw data can be downloaded *[here](http://raw.githubusercontent.com/marianarf/covid19_mexico_analysis/master/mexico_covid19.csv)* It consists roughly of 26 300 patient data, such as gender, age and different medical conditions.
The data cleaning are done in a R-script *(data/data_cleaning.R)*.
From the raw data only the records with patients that have died from Covid19 is kept (4542), and this subset of data is used to build our model, which will predict the likelihood of death in case of Covid-19 infection.

Initially below features where kept as potential candidates for the model features:
- Gender
- DateOfDeath
- Neumonia
- Age
- Pregnant
- Diabetes
- Astma
- ImmunoSuppressed
- Hypertension
- Cardiovascular
- Obese
- Smoking


# Data model
The data model are build and trained using jupyter notebook(**data/model_discovery.ipynb**).
NA values for pregnancy are imputed by the median value along all data.
Since the target variable is binary _(surviving or not surviving Covid-19)_, the logistic regression is used.

Further the features with highest k scores are selected for the model.
The number of features are further narrowed down based on their internal correlations, since logistic regression require no or little correlations between the independent variables (features).

The resulting features used to train the model are following:
- Age
- Gender  
- Neumonia       
- Obese


**Start jupyter notebook**

Ensure the server is running to run the jupyter notebook.

```
$ cd covid19
$ jupyter notebook
```

# Save and test the trained model

The trained model need to be saved in the folder **server** in order to run a quick sanity py-test.
Anytime the model is retrained or modify, the new model need to be manually moved to the folder.

Run the testfile **test_model_sanity.py**.

```
cp ./data/covid19_model_to_be_tested.sav
./server/covid19_model_v1.sav
```

# Architecture

Architecture![Architecture](/client/public/architecture.jpg)

# Improvements
- Naturally the selection of model and features selection deserve much more time and fine-tuning, than what has been given in this ad hoc project.
- The UI is simplistic and missing some obvious end-user features such as hotlinking, social media, inforimation regarding the covid vaccinations in country... to name a few.
- Backend is storing most of the data hard-coded, which could be trasferred to a database. 

# Disclaimer
The app, including but not limited to, text, graphics, images and other material contained on this website are for informational purposes only. No material on this site is intended to be a substitute for professional medical advice, diagnosis or treatment. Always seek the advice of your physician or other qualified health care provider with any questions you may have regarding a medical condition or treatment and never disregard professional medical advice or delay in seeking it because of something due to this app.
