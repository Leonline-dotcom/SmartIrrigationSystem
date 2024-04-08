from flask import Flask, request, Response, jsonify, make_response, stream_with_context
from flask_cors import CORS
import logging
import json
import time
from logging.handlers import RotatingFileHandler
import socket
import threading
# from threading import Lock

app = Flask(__name__)
CORS(app)

STATE_FILE = 'solenoid_states.txt'
WATER_LEVEL = 'water_level.txt'
PUMP_STATUS = 'pump_state.txt'
ESP32_STATUS = 'esp32_status.txt'
BATTERY_LEVEL = 'battery_level.txt'

subscribers = []

#TODO Write a indication the esp32 is connected to the internet

@app.route('/test')
def test():
    return "Test successful", 200

def read_states():
    try:
        with open(STATE_FILE, 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        # Return default state if file does not exist or is empty/corrupted
        return {
            "solenoid1": False,
            "solenoid2": False,
            "solenoid3": False,
            "solenoid4": False
        }

def read_solenoid_states():
    try:
        with open(STATE_FILE, 'r') as f:
            states = json.load(f)
            print(f"Reading solenoid states for ESP32: {states}")
            return states
    except (FileNotFoundError, json.JSONDecodeError):
        # Return default state if file does not exist or is empty/corrupted
        return {
            "solenoid1": False,
            "solenoid2": False,
            "solenoid3": False,
            "solenoid4": False
        }
    
def read_pump_state():
    try:
        with open(PUMP_STATUS, 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {
            "pumpStatus": False
        }
    
def read_water_level():
    try:
        with open(WATER_LEVEL, 'r') as file:
            return json.load(file)
    except Exception as e:
        print(f"Error reading water level: {e}")
        return {"waterLevel": "Unknown"}

TIMEOUT_THRESHOLD = 20  # Time out needs to bigger than the delay on the esp32
def read_esp32_status():
    try:
        with open(ESP32_STATUS, 'r') as f:
            status = json.load(f)
            last_update = status.get("last_update", 0)
            if time.time() - last_update > TIMEOUT_THRESHOLD:
                # If the last update is older than the threshold, assume disconnected
                return {'connected': False, 'network': 'None'}
            return status
    except Exception as e:
        print(f"Error reading esp32 status: {e}")
        return {'connected': False, 'network': 'None'}

def write_pump_state(state):
    with open(PUMP_STATUS, 'w') as f:
        json.dump(state, f)
    
def write_solenoid_states(states):
    try:
        with open(STATE_FILE, 'w') as f:
            json.dump(states, f)
        print(f"Writing solenoid states to file: {states}")
    except Exception as e:
        app.logger.error(f"Failed to write solenoid states: {e}")

def write_water_level(data):
    try:
        with open(WATER_LEVEL, 'w') as file:
            json.dump(data, file)
    except Exception as e:
        print(f"Error writing water level: {e}")

def write_esp32_status(status):
    status_with_timestamp = status.copy()
    status_with_timestamp["last_update"] = time.time()  # Adds the current timestamp
    with open(ESP32_STATUS, "w") as f:
        json.dump(status_with_timestamp, f)

@app.route('/api/toggle-solenoid', methods=['POST'])
def toggle_solenoid():
    global solenoids
    data = request.json  # Expecting a JSON payload with solenoid states
    app.logger.info(f"Received toggle request: {data}")
    solenoids = read_solenoid_states()
    try:
            for solenoid, state in data.items():
                if solenoid in solenoids:
                    solenoids[solenoid] = state
                    app.logger.info(f"Toggled {solenoid} to {state}")
                else:
                    app.logger.error(f"Invalid solenoid ID: {solenoid}")
                    return jsonify({"error": f"Invalid solenoid ID: {solenoid}"}), 400
            notify_subscribers()  # Notify all subscribers about the update
            write_solenoid_states(solenoids)
            return jsonify(solenoids), 200
    except Exception as e:
        app.logger.error(f"Error handling toggle request: {str(e)}")
        return jsonify({"error": "Error processing request"}), 500
    
@app.route('/api/toggle-pump', methods=['POST'])
def toggle_pump():
    data = request.json
    app.logger.info(f"Recieved pump toggle request: {data}")
    pump_status = read_pump_state()

    pump_status["pumpStatus"] = not pump_status["pumpStatus"]
    try:
        write_pump_state(pump_status)
        app.logger.info(f"Toggled pump to {'on' if pump_status['pumpStatus'] else 'off'}")
        # Return the new pump status
        return jsonify(pump_status), 200
    except Exception as e:
        app.logger.error(f"Error handling pump toggle request: {str(e)}")
        return jsonify({"error": "Error processing request"}), 500
        

@app.route('/events')
def solenoid_events():
    def stream():
        while True:
            if subscribers:
                event_data = json.dumps(solenoids)
                app.logger.info("Sending update to subscribers")
                yield f"data: {event_data}\n\n"
                subscribers.clear()  # Clear the list after notifying
            time.sleep(1)
    return Response(stream(), content_type='text/event-stream')

# API to get the current state of all solenoids
@app.route('/api/solenoid-states', methods=['GET'])
def get_solenoid_states():
    app.logger.info("Received request for solenoid states")
    solenoids = read_solenoid_states()

    response_data = {
        solenoid: state for solenoid, state in solenoids.items()
        if solenoid.startswith('solenoid')  # Filter keys to include only solenoid states
    }


    app.logger.debug(f"Current solenoid states: {solenoids}")
    response = make_response(jsonify(response_data), 200)
    print(f"Sending solenoid states to ESP32: {response_data}")
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
    app.logger.debug(f"Sending response: {response.get_data(as_text=True)}")
    return response

@app.route('/api/pump-state', methods=['GET'])
def get_pump_state():
    app.logger.info("Received request for pump state")
    pump = read_pump_state()
    app.logger.debug(f"Current pump state: {pump}")
    response = make_response(jsonify(pump), 200)
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'  # Set headers to prevent caching
    app.logger.debug(f"Sending response: {response.get_data(as_text=True)}")
    return response


@app.route('/api/water-level', methods=['POST'])
def update_water_level():
    data = request.get_json()
    print("Received Water Level Data:", data)
    write_water_level(data)
    return jsonify({"success": True}), 200

@app.route('/api/water-level-stream')
def water_level_stream():
    def stream():
        old_data = None
        while True:
            current_data = read_water_level()
            if current_data != old_data:
                yield f"data: {json.dumps(current_data)}\n\n"
                old_data = current_data
            time.sleep(1)

    return Response(stream_with_context(stream()), content_type='text/event-stream')

@app.route('/api/update-esp32-status', methods=['POST'])
def update_esp32_status():
    data = request.get_json()
    esp32_status = {
        'connected': data.get('connected', False),
        'network': data.get('network', 'None')
    }
    write_esp32_status(esp32_status)
    return jsonify({"success": True}), 200

@app.route('/api/esp32-status-stream')
def esp32_status_stream():
    def stream():
        while True:
            status = read_esp32_status()
            yield f"data: {json.dumps(status)}\n\n"
            time.sleep(1)  # Stream update every 1 second

    return Response(stream(), content_type='text/event-stream')

scheduled_runs = {}

# NOTE: DOES NOT HAVE THE FILE READING TO RUN ON AWS
@app.route('/api/quick-run', methods=['POST'])
def schedule_run():
    data = request.json
    duration = data['duration']
    zones = data['zones']
    print(f"Run solenoids for {duration} seconds on zones {zones}")
    
    scheduled_runs['run'] = {
        'duration': duration,
        'zones': zones,
        'timestamp': time.time()  # Store the timestamp of when this was scheduled
    }

    return jsonify({"success": True, "message": "Command to run solenoids received"}), 200

@app.route('/api/quick-run-status', methods=['GET'])
def get_scheduled_run():
    # Check if there's a scheduled run and return it
    if 'run' in scheduled_runs:
        # You might want to add logic to only send runs that are still valid based on the current time
        return jsonify(scheduled_runs['run']), 200
    else:
        # No scheduled run available
        return jsonify({"message": "No scheduled run available"}), 404
    
solenoid_status = {}
def turn_off_solenoid(solenoid_id):
    # Function to turn off the solenoid, will be called after the duration
    # Implement the logic to send a command to the ESP32 to turn off the solenoid
    solenoids = read_solenoid_states()
    solenoids[solenoid_id] = False
    write_solenoid_states(solenoids)
    print(f"Solenoid {solenoid_id} is now off.")
    

@app.route('/api/solenoid-control', methods=['POST'])
def solenoid_control():
    data = request.json
    print(f"Received toggle request from frontend: {data}")
    solenoid_id = data['solenoidId']
    status = data['status']
    duration = data.get('duration', 0) 
    

    solenoids = read_solenoid_states()
    solenoids[solenoid_id] = status
    write_solenoid_states(solenoids)

    # Implement the logic to send a command to the ESP32 to change the solenoid status
    if status:
        print(f"Solenoid {solenoid_id} on for {duration} seconds.")
        solenoid_status[solenoid_id] = True
        if duration > 0:
            # Schedule to turn off the solenoid after the duration
            threading.Timer(duration, turn_off_solenoid, [solenoid_id]).start()
    else:
        print(f"Solenoid {solenoid_id} off.")
        solenoid_status[solenoid_id] = False
        # If stopping immediately, cancel any existing timer (if applicable) and turn off
        
    return jsonify({"message": "Solenoid status updated."}), 200

@app.route('/api/update-battery-level', methods=['POST'])
def update_battery_level():
    data = request.get_json()
    battery_voltage = data.get('voltage')
    with open(BATTERY_LEVEL, 'w') as file:
        json.dump({'voltage': battery_voltage}, file)
    return jsonify({"success": True}), 200


@app.route('/api/battery-level-stream')
def battery_level_stream():
    def stream():
        old_data = None
        while True:
            try:
                with open(BATTERY_LEVEL, 'r') as file:
                    current_data = json.load(file)
                    if current_data != old_data:
                        yield f"data: {json.dumps(current_data)}\n\n"
                        old_data = current_data
            except FileNotFoundError:
                yield "data: {}\n\n"
            time.sleep(1)  # Adjust timing as needed

    return Response(stream(), content_type='text/event-stream')



def update_battery_level():
    notify_subscribers()  # Notify all subscribers about the update
    return jsonify({"success": True}), 200

def notify_subscribers():
    subscribers.append(1)  # Add a dummy value to indicate a new update
    app.logger.info("Notified subscribers")

@app.errorhandler(Exception)
def handle_exception(e):
    # Log the error
    app.logger.error(f"An error occurred: {str(e)}")

    # Return a JSON response with the error
    return jsonify(error=str(e)), 500

@app.before_request
def log_request_info():
    app.logger.debug(f"Headers: {request.headers}")
    app.logger.debug(f"Body: {request.get_data()}")


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
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)
    print(f"Flask server can be reached at: {local_ip}:5001")
    app.run(host='0.0.0.0', port=5001, threaded=True) # Run in 5001 for localhost
    app.debug = True
    # app.run(host='0.0.0.0', port=5000) # Run in 5000 for production on AWS
