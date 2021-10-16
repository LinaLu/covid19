from flask import Flask, jsonify
app = Flask(__name__)

@app.route('/api/risk', methods=['POST'])
def calculate_covid_risk():
    return jsonify({'risk':'You are probably gonna be fine?'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
