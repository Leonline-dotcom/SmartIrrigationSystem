from pymongo import MongoClient


    
url ="mongodb+srv://leon:shaji@cluster0.uaokiyz.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(url)
database = client.Senior_Design
Users = database["Users"]

# VVV how to add a document VVV
result = Users.insert_one({
    'name': 'John Smith',
    'email': 'john@example.com'
})
print("hey")

print(result.inserted_id)

