from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Testing Hardware deploy 
connection_status = {"connected": False}

@app.route('/api/esp-status', methods=['POST'])
def update_esp_status():
    global connection_status
    data = request.json
    print("Received data:", data)
    connection_status = data  # Stores the received status
    return jsonify({"message": "Data received successfully"}), 200

@app.route('/api/esp-status', methods=['GET'])
def get_esp_status():
    return jsonify(connection_status), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
