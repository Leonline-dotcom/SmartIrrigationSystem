from flask import Flask, request, jsonify
from flask_cors import CORS

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




#TODO Write a indication the esp32 is connected to the internet

#Solenoid Control
# API to toggle solenoid state
@app.route('/api/toggle-solenoid/<solenoid_id>', methods=['POST'])
def toggle_solenoid(solenoid_id):
    if solenoid_id in solenoids:
        # Toggle solenoid state
        solenoids[solenoid_id] = not solenoids[solenoid_id]
        return jsonify({"message": f"{solenoid_id} toggled", "new_state": solenoids[solenoid_id]}), 200
    else:
        return jsonify({"error": "Invalid solenoid ID"}), 404

# API to get the current state of all solenoids
@app.route('/api/solenoid-states', methods=['GET'])
def get_solenoid_states():
    return jsonify(solenoids), 200

if __name__ == '__main__':
    # app.run(host='0.0.0.0', port=5001) # Run in 5001 for localhost
    app.run(host='0.0.0.0', port=5000) # Run in 5000 for production on AWS
