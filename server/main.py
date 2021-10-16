import pickle
from flask import Flask, jsonify
from pandas import array

app = Flask(__name__)

logger = app.logger

logger.info("Initializing the backend api")
logger.info("Loading the model...")
covid_risk_model = pickle.load(open('covid19_model_v1.sav', 'rb'))
logger.info("Model loaded.")


@app.route('/api/risk', methods=['POST'])
def calculate_covid_risk():

    result = covid_risk_model.predict([[1, 90, 62, 38, 2, 0.787, 40, 4]])
    print(result)
    return jsonify({'risk': result.tolist()})


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)
