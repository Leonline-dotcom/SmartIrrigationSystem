from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import socket
import logging
from logging.handlers import RotatingFileHandler

app = Flask(__name__)
CORS(app)

# To allow specific domains
CORS(app, resources={r"/api/*": {"origins": "http://www.oasis-flow.com"}})

#https://stackoverflow.com/questions/11994325/how-to-divide-flask-app-into-multiple-py-files
#^^^ Explaining how to put our flasks in multiple files

connection_status = {"connected": False}

# Initialize solenoid states
solenoids = {
    "solenoid1": False,
    "solenoid2": False,
    "solenoid3": False,
    "solenoid4": False
}
#Error testing
#TODO Write a indication the esp32 is connected to the internet


@app.route('/api/test', methods=['GET'])
def test_endpoint():
    # This is just a simple response to indicate that the request was successful
    return jsonify({"message": "Test endpoint hit successfully"}), 200


# ESP32_IP = None
@app.route('/api/register-esp', methods=['POST'])
def register_esp():
    # global ESP32_IP
    data = request.json
    ESP32_IP = data['ip']
    with open("esp32_ip.txt", "w") as ip_file:
        ip_file.write(ESP32_IP)
    print(f"ESP32 IP Address Updated: {ESP32_IP}")
    app.logger.info(f"ESP32 IP Address Updated: {ESP32_IP}")
    print(ESP32_IP)
    return jsonify({"message": "ESP32 IP registered successfully"}), 200


# ESP32_IP = '10.159.64.103'  # Replace with the ESP32's IP address from the arduino serial monitor
@app.route('/api/toggle-solenoids', methods=['POST'])
def toggle_solenoids():
    # print(f"ESP32_IP: {ESP32_IP}")  # Print the ESP32 IP address
    # app.logger.info(f"ESP32 Address in toggle_solenoids: {ESP32_IP}")
    try:
        with open("esp32_ip.txt", "r") as ip_file:
            ESP32_IP = ip_file.read().strip()
    except FileNotFoundError:
        app.logger.error("ESP32 IP address file not found.")
        return jsonify({"error": "ESP32 IP address not found"}), 500
    
    solenoid_states = request.json
    print(f"Solenoid States Received: {solenoid_states}")  # Print the received solenoid states
    app.logger.info(f"Solenoid States Received: {solenoid_states}")
    try:
        # Forward the request to the ESP32 server
        response = requests.post(f"http://{ESP32_IP}/api/toggle-solenoids", json=solenoid_states)
        # response = requests.post(f"http://10.2.242.249/api/toggle-solenoids", json=solenoid_states)
        if response.status_code == 200:
            return jsonify({"message": "Solenoids toggled successfully"}), 200
        else:
            return jsonify({"error": "Failed to toggle solenoids", "details": response.text}), response.status_code
    except Exception as e:
        print(f"Error connecting to ESP32: {str(e)}")  # Print any connection errors
        app.logger.info(f"Error connecting to ESP32: {str(e)}")
        return jsonify({"error": "Failed to connect to ESP32", "details": str(e)}), 500


if not app.debug:
    log_formatter = logging.Formatter('%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]')
    
    # Define the log file name and max size (here, 100 MB)
    file_handler = RotatingFileHandler('flask_app.log', maxBytes=100 * 1024 * 1024, backupCount=10)
    file_handler.setFormatter(log_formatter)
    file_handler.setLevel(logging.INFO)
    
    # Add the handler to the Flask app's logger
    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.INFO)

if __name__ == '__main__':
    # hostname = socket.gethostname()
    # local_ip = socket.gethostbyname(hostname)
    # print(f"Flask server can be reached at: {local_ip}:5001")
    app.run(host='0.0.0.0', port=5001) # Run in 5001 for localhost
    app.debug = True
    # app.run(host='0.0.0.0', port=5000) # Run in 5000 for production on AWS
