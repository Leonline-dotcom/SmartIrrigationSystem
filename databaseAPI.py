import srv as srv
from pymongo import MongoClient
import certifi

ca = certifi.where()
#dbURL = "mongodb+srv://AdrianGallegos:rEVwgkZbo9WFFHjo@cluster0.fymg6ls.mongodb.net/?retryWrites=true&w=majority"
dbURL = "mongodb+srv://leon:36uWjhORYtUi9Oif@cluster0.uaokiyz.mongodb.net/?retryWrites=true&w=majority"

def addNewUser(username, password):
    with MongoClient(dbURL, tlsCAFile=ca) as org:
        usersDB = org["Users"]
        usersCols = usersDB.list_collection_names()
        if username in usersCols:
            return False
        else:
            newUser = usersDB[username]
            insert = {"Username": username, "Password": password}
            newUser.insert_one(insert)
            return True


def authenticateUser(username, password):
    with MongoClient(dbURL, tlsCAFile=ca) as org:
        usersDB = org["Users"]
        usersCols = usersDB.list_collection_names()

        if username not in usersCols:
            return False

        myUser = usersDB[username]
        myPassword = myUser.find_one()["Password"]

        if myPassword != password:
            return False

        return True