from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Apis for getting connection status of ESP32
connection_status = {"connected": False}
button_pressed = False
led_state = "off"


# Change this to a PUT so it doesn't create so many entities
@app.route('/api/esp-status', methods=['POST'])
def update_esp_status():
    global connection_status    # 
    data = request.json
    print("Received data:", data)
    connection_status = {
        "connected": data.get('connected', False),
        "ssid": data.get('ssid', ''),
        "password": data.get('password', '')   
    }
    return jsonify({"message": "Data received successfully"}), 200

@app.route('/api/esp-status', methods=['GET'])
def get_esp_status():
     return jsonify(connection_status), 200

# https://assertible.com/blog/7-http-methods-every-web-developer-should-know-and-how-to-test-them

# TODO Also create an example webpage to demonstrate these

# TODO Create template for GET

# TODO Create template for POST

# TODO Create template for PUT

# TODO Create template for PATCH

# TODO Create template for DELETE

# TODO Create template for HEAD

#ESP32 control code:
@app.route('/api/button-press', methods=['POST'])
def button_press():
    global button_pressed
    button_pressed = True
    return jsonify({"message": "Button press received"}), 200

@app.route('/api/button-status', methods=['GET'])
def get_button_status():
    global button_pressed
    status = button_pressed
    button_pressed = False  # Reset after checking
    return jsonify({"buttonPressed": status}), 200

@app.route('/api/led-control', methods=['POST'])
def set_led_control():
    global led_state
    led_state = request.json.get('state', 'off')
    return jsonify({"message": f"LED state updated to {led_state}"}), 200

@app.route('/api/led-state', methods=['GET'])
def get_led_state():
    global led_state
    return jsonify({"ledState": led_state}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
