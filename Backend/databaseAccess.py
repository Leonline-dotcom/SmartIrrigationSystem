from flask import Flask, request
from pymongo import MongoClient
import certifi 

app = Flask(__name__)

ca = certifi.where()

client = MongoClient(
    "mongodb+srv://leon:shaji@cluster0.uaokiyz.mongodb.net/?retryWrites=true&w=majority",
    tlsCAFile=ca  # Use the certifi CA bundle
)

# MongoDB connection
# client = MongoClient("mongodb+srv://leon:shaji@cluster0.uaokiyz.mongodb.net/?retryWrites=true&w=majority")
db = client.Senior_Design
collection = db.TestConnection
ca = certifi.where()


@app.route('/updateButtonPress', methods=['GET'])
def update_button_press():
    # Logic to update MongoDB
    result = collection.insert_one({"buttonPressed": True})
    print("Button press request received and inserted into MongoDB.")
    return f"Inserted: {result.inserted_id}"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
