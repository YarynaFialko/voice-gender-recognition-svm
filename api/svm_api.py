from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/', methods=['GET'])
def index():
    return jsonify({'output': 'Hello World!'})


@app.route('/predict', methods=['GET'])
def predict():
    file = str(request.args.get('file'))
    output = subprocess.check_output(['./main', file])

    return jsonify({'output': output.decode('utf-8').strip().split("\n")})


if __name__ == '__main__':
    app.run(port=8080)
