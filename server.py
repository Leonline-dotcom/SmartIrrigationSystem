import databaseAPI as db
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "http://localhost:5173", "methods": ["POST"]}})
CORS(app)

allUsers = {
    "username": "admin",
    "password": "testing"
}

@app.route("/")
def hello():
    return "Bruh"

@app.route("/login", methods=['POST'])
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

@app.route("/register", methods=['POST'])
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


# if __name__ == "__main__":
#     app.run(debug=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
