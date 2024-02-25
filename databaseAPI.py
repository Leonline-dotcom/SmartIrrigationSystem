import srv as srv
from pymongo import MongoClient
import certifi

ca = certifi.where()
#dbURL = "mongodb+srv://AdrianGallegos:rEVwgkZbo9WFFHjo@cluster0.fymg6ls.mongodb.net/?retryWrites=true&w=majority"
dbURL = "mongodb+srv://leon:36uWjhORYtUi9Oif@cluster0.uaokiyz.mongodb.net/?retryWrites=true&w=majority"

def addNewUser(username, password, email):
    with MongoClient(dbURL, tlsCAFile=ca) as org:
        usersDB = org["Users"]
        usersCols = usersDB.list_collection_names()
        if username in usersCols:
            return False
        else:
            newUser = usersDB[username]
            insert = {"Password": password,
                      "Email": email,
                      "Name": "",
                      "Schedule": {
                          "Day": {
                              "Monday": "",
                              "Tuesday": "",
                              "Wednesday": "",
                              "Thursday": "",
                              "Friday": "",
                              "Saturday": "",
                              "Sunday": "",
                          }
                      },
                      "Grid": {
                          "Zone1": {
                              "Schedule": {
                                "Day": {
                                    "Monday": {
                                        "Time": "",
                                        "Duration": ""
                                    },
                                    "Tuesday": {
                                        "Time": "",
                                        "Duration": ""
                                    },
                                    "Wednesday": {
                                        "Time": "",
                                        "Duration": ""
                                    },
                                    "Thursday": {
                                        "Time": "",
                                        "Duration": ""
                                    },
                                    "Friday": {
                                        "Time": "",
                                        "Duration": ""
                                    },
                                    "Saturday": {
                                        "Time": "",
                                        "Duration": ""
                                    },
                                    "Sunday": {
                                        "Time": "",
                                        "Duration": ""
                                    },
                                }
                              },
                              "History": {
                                  "Days": {},
                                  "Time": {},
                                  "Duration": {}
                              },
                              "Moisture Level": "",
                              "Status": ""
                          },
                          "Zone2": {
                              "Schedule": "",
                              "History": "",
                              "Moisture Level": "",
                              "Status": ""
                          },
                          "Zone3": {
                              "Schedule": "",
                              "History": "",
                              "Moisture Level": "",
                              "Status": ""
                          },
                          "Zone4": {
                              "Schedule": "",
                              "History": "",
                              "Moisture Level": "",
                              "Status": ""
                          },
                          "Status": ""
                      },
                      "Device Settings": {
                          "Wifi": {
                              "Name": "",
                              "Password": ""
                          },
                          "Location": "",
                          "Connection Status": "",
                          "Water Tank Status": ""
                      }
                      }
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