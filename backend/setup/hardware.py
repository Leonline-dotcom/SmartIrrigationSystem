from flask import Flask, request, Response, jsonify, make_response
from flask_cors import CORS
import logging
import json
import time
from logging.handlers import RotatingFileHandler

app = Flask(__name__)
CORS(app)



# Initialize solenoid states
solenoids = {
    "solenoid1": False,
    "solenoid2": False,
    "solenoid3": False,
    "solenoid4": False
}
#Error testing
#TODO Write a indication the esp32 is connected to the internet


subscribers = []


@app.route('/api/toggle-solenoid', methods=['POST'])
def toggle_solenoid():
    global solenoids
    data = request.json  # Expecting a JSON payload with solenoid states
    app.logger.info(f"Received toggle request: {data}")
    try:
        for solenoid, state in data.items():
            if solenoid in solenoids:
                solenoids[solenoid] = state
                app.logger.info(f"Toggled {solenoid} to {state}")
            else:
                app.logger.error(f"Invalid solenoid ID: {solenoid}")
                return jsonify({"error": f"Invalid solenoid ID: {solenoid}"}), 400
        notify_subscribers()  # Notify all subscribers about the update
        return jsonify(solenoids), 200
    except Exception as e:
        app.logger.error(f"Error handling toggle request: {str(e)}")
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
    response = make_response(jsonify(solenoids), 200)
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
    return response



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
    # hostname = socket.gethostname()
    # local_ip = socket.gethostbyname(hostname)
    # print(f"Flask server can be reached at: {local_ip}:5001")
    app.run(host='0.0.0.0', port=5001, threaded=True) # Run in 5001 for localhost
    app.debug = True
    # app.run(host='0.0.0.0', port=5000) # Run in 5000 for production on AWS
