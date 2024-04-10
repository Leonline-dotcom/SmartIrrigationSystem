from flask import Blueprint, jsonify, request
import requests

# Create a Blueprint for weather endpoints
weather_blueprint = Blueprint('weather', __name__)

@weather_blueprint.route('/')
def index():
    return "This is an example app"

@weather_blueprint.route('/weather')
def get_weather():
    weather_data = {
        'city': 'Austin',
        'temperature': 75,
        'description': 'Sunny'
    }
    return jsonify(weather_data)

@weather_blueprint.route('/weatherinfo')
def get_weather_info():
    api_key = 'f94e0e45d1c9451df5f703dccc819650'
    city = 'Austin'
    url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=imperial'
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return jsonify({'error': 'Failed to fetch weather data'})

