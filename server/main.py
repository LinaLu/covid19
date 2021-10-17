import pickle
from flask import Flask, jsonify, request


def load_model():
    return pickle.load(open('covid19_model_v1.sav', 'rb'))


app = Flask(__name__)
logger = app.logger
logger.info("Initializing the backend api")
logger.info("Loading the model...")
covid_risk_model = load_model()
logger.info("Model loaded.")


@app.route('/api/risk', methods=['POST'])
def calculate_covid_risk():
    parameters = request.json
    age = parameters.get("age", 0)
    probabilities = covid_risk_model.predict_proba([[0, age, 0, 0, 0, 0, 0, 0]])
    probability_of_death = probabilities.tolist()[0][1]
    return jsonify({
        'risk': probability_of_death,
        'parameters': parameters
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)
