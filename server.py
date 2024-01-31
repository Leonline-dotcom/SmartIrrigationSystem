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
    return jsonify(username)
    # Validate the credentials (for demonstration purposes)
    # if username == allUsers['username'] and password == allUsers['password']:
    #     return jsonify({"message": "Login successful"})
    # else:
    #     return jsonify({"message": "Invalid credentials"}), 401

# @app.route('/login', methods=['OPTIONS'])
# def login_options():
#     return '', 204


# if __name__ == "__main__":
#     app.run(debug=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
