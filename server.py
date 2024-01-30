from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

allUsers = {
    "username": "admin",
    "password": "testing"
}

@app.route("/")
def hello():
    return "Bruh"

@app.route("/login", methods=['POST'])
def signIn():
    creds = request.form
    username = creds.get('username')
    password = creds.get('password')
    return jsonify(username)
    # Validate the credentials (for demonstration purposes)
    # if username == allUsers['username'] and password == allUsers['password']:
    #     return jsonify({"message": "Login successful"})
    # else:
    #     return jsonify({"message": "Invalid credentials"}), 401

if __name__ == "__main__":
    app.run(debug=True)
