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


def risk_context(probability_of_death):
    return [{"name": key, "covid": key == "Covid19", "value": value} for (key, value) in {
        'Drug poisoning': 2000,
        'Covid19': 3000,
        'Motor vehicle accident': 4000
    }.items()]


@app.route('/api/risk', methods=['POST'])
def calculate_covid_risk():
    parameters = request.json
    age = parameters.get("age", 0)
    gender = parameters.get("gender", 0)
    obese = parameters.get("obese", 0)

    # Gender  (1 = Female 2 =male) / Neumonia / Age / Obese
    probabilities = covid_risk_model.predict_proba([[gender, 0, age, obese]])
    probability_of_death = probabilities.tolist()[0][1]
    probability_of_death = round(probability_of_death, 5)
    
    return jsonify({
        'parameters': parameters,
        'score': {
            'probabilityOfDeath': probability_of_death,
            'class': 'average',  # low high average
            'context': risk_context(probability_of_death)
        },

    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)
