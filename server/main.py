import pickle
from flask import Flask, jsonify, request
from collections import OrderedDict
from itertools import chain, islice

def load_model():
    return pickle.load(open('covid19_model_v1.sav', 'rb'))


app = Flask(__name__)
logger = app.logger
logger.info("Initializing the backend api")
logger.info("Loading the model...")
covid_risk_model = load_model()
logger.info("Model loaded.")


def window(iterable):
    it = iter(iterable)
    result = tuple(islice(it, 2))
    if len(result) == 2:
        yield result
    for element in it:
        result = result[1:] + (element,)
        yield result


def risk_context(probability_of_death):
    probabilities = OrderedDict({
        "Heart disease": 17,
        "Cancer": 14,
        "Alzheimer's disease": 4.3,
        "Diabetes": 3.1,
        "Influenza and pneumonia": 1.7,
        "Suicide": 1.1,
        "Motor vehicle crash": 0.93,
        "Pedestrian incident": 0.18,
        "Tornado": 0.0032,
        "Bee stings": 0.0016,
        "Lightning": 0.00041,
    })

    item = {"Covid19": probability_of_death}
    for p_item, n_item in window(probabilities.items()):
        p_key, p_value = p_item
        if probability_of_death > p_value:
            return [{"name": key, "covid": key == "Covid19", "value": value} for (key, value) in
                    {**item, **dict([p_item])}.items()]

        n_key, n_value = n_item
        print( {**dict([p_item]), **item, **dict([n_item])})
        if p_value > probability_of_death > n_value:
            return [{"name": key, "covid": key == "Covid19", "value": value} for (key, value) in
                    {**dict([p_item]), **item, **dict([n_item])}.items()]


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
