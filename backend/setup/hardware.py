from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import socket

app = Flask(__name__)
CORS(app)

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


ESP32_IP = None
@app.route('/api/register-esp', methods=['POST'])
def register_esp():
    global ESP32_IP
    data = request.json
    ESP32_IP = data['ip']
    print(f"ESP32 IP Address Updated: {ESP32_IP}")
    return jsonify({"message": "ESP32 IP registered successfully"}), 200


# ESP32_IP = '10.159.64.103'  # Replace with the ESP32's IP address from the arduino serial monitor
@app.route('/api/toggle-solenoids', methods=['POST'])
def toggle_solenoids():
    solenoid_states = request.json
    try:
        # Forward the request to the ESP32 server
        response = requests.post(f"http://{ESP32_IP}/api/toggle-solenoids", json=solenoid_states)
        if response.status_code == 200:
            return jsonify({"message": "Solenoids toggled successfully"}), 200
        else:
            return jsonify({"error": "Failed to toggle solenoids", "details": response.text}), response.status_code
    except Exception as e:
        return jsonify({"error": "Failed to connect to ESP32", "details": str(e)}), 500


if __name__ == '__main__':
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)
    print(f"Flask server can be reached at: {local_ip}:5001")
    app.run(host='0.0.0.0', port=5001) # Run in 5001 for localhost
    # app.run(host='0.0.0.0', port=5000) # Run in 5000 for production on AWS
