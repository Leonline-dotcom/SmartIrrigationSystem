from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001) # Run in 5001 for localhost
    # app.run(host='0.0.0.0', port=5000) # Run in 5000 for production on AWS
