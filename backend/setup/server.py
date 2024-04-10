import databaseAPI as db
from flask import Blueprint, Flask, request, jsonify
from flask_cors import CORS
import socket

server_blueprint = Blueprint('server_blueprint', __name__)
#app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "http://localhost:5173", "methods": ["POST"]}})
#CORS(app)

allUsers = {
    "username": "admin",
    "password": "testing"
}


@server_blueprint.route("/")
def hello():
    return "Bruh"


@server_blueprint.route("/api/login", methods=['POST'])
def signIn():
    creds = request.json
    username = creds.get('username')
    password = creds.get('password')
    print("Username: ", username)
    print("Password: ", password)
    # Validate the credentials (for demonstration purposes)
    if db.authenticateUser(username, password):
        return jsonify({"message": "Login successful"})
    return jsonify({"message": "Invalid credentials"})


@server_blueprint.route("/api/register", methods=['POST'])
def signUp():
    creds = request.json
    username = creds.get('username')
    password = creds.get('password')
    email = creds.get('email')
    print("Username: ", username)
    print("Password: ", password)
    print("Email: ", email)
    # Validate the credentials (for demonstration purposes)
    if db.addNewUser(username, password, email):
        return jsonify({"message": "New User Created"})
    # Can optionally later customize this to display message such as "Username already taken",
    # "Password doesn't include ______", "Email is already associated to an account"
    return jsonify({"message": "Username already taken"})


@server_blueprint.route("/api/Calendar", methods=['POST'])
def schedule():
    creds = request.json
    #username = creds.get('username')
    username = "admin4"
    zone = creds.get('zone')
    monday = creds.get('monday')
    tuesday = creds.get('tuesday')
    wednesday = creds.get('wednesday')
    thursday = creds.get('thursday')
    friday = creds.get('friday')
    saturday = creds.get('saturday')
    sunday = creds.get('sunday')
    time = creds.get('time')
    duration = creds.get('duration')
    if db.addSchedule(username, zone, monday, tuesday, wednesday, thursday, friday, saturday, sunday, time, duration):
        db.update_zone_status(username, zone)
        db.update_grid_zone_status(username)
        return jsonify({"message": "Successfully added schedule"})
    return jsonify({"message": "Failed to add schedule"})


@server_blueprint.route("/api/Calendar", methods=['GET'])
def get_schedules():
    username = "admin4"
    zone1, zone2, zone3, zone4 = db.get_zone_schedules(username)
    # # Convert ObjectId to string
    # if zone1:
    #     zone1["_id"] = str(zone1["_id"])
    # if zone2:
    #     zone2["_id"] = str(zone2["_id"])
    # if zone3:
    #     zone3["_id"] = str(zone3["_id"])
    # if zone4:
    #     zone4["_id"] = str(zone4["_id"])

    print({"Zone 1": zone1, "Zone 2": zone2, "Zone 3": zone3, "Zone 4": zone4})
    return jsonify({"Zone 1": zone1, "Zone 2": zone2, "Zone 3": zone3, "Zone 4": zone4})


@server_blueprint.route("/api/remove_day", methods=['POST'])
def remove_day():
    creds = request.json
    username = "admin4"
    zone = creds.get('zone')
    day = creds.get('day')
    more_days = db.remove_scheduled_day(username, zone, day)
    if more_days == False:
        db.remove_zone_status(username, zone)
    print(more_days)
    return jsonify({"message": "Successfully removed scheduled zone day"})


# if __name__ == "__main__":
#     app.run(debug=True)

# if __name__ == '__main__':
#     hostname = socket.gethostname()
#     local_ip = socket.gethostbyname(hostname)
#     print(f"Flask server can be reached at: {local_ip}:5001")
#     app.run(host='0.0.0.0', port=5001, threaded=True) # Run in 5001 for localhost
#     app.debug = True
