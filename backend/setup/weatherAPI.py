from flask import Flask, jsonify
from flask import Flask, request, Response, jsonify, make_response, stream_with_context
from flask_cors import CORS
import requests
import socket

app = Flask(__name__)
CORS(app)

@app.route('/api/weather')
def get_weathero():
    weather_data = {
        'city': 'Austin',
        'temperature': 75,
        'description': 'Sunny'
    }
    return jsonify(weather_data)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/weatherinfo')
def get_weather():
    api_key = 'f94e0e45d1c9451df5f703dccc819650'
    city = 'Austin'
    url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=imperial'
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return jsonify({'error': 'Failed to fetch Da data'})
    
if __name__ == '__main__':
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)
    print(f"Flask server can be reached at: {local_ip}:5001")
    app.run(host='0.0.0.0', port=5001, threaded=True) # Run in 5001 for localhost
    app.debug = True
