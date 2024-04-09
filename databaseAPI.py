#import srv as srv
from pymongo import MongoClient
import certifi

ca = certifi.where()
# dbURL = "mongodb+srv://AdrianGallegos:rEVwgkZbo9WFFHjo@cluster0.fymg6ls.mongodb.net/?retryWrites=true&w=majority"
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
                          "Zone 1": {
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
                              "Status": False
                          },
                          "Zone 2": {
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
                              "Status": False
                          },
                          "Zone3": {
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
                              "Status": False
                          },
                          "Zone 4": {
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
                              "Status": False
                          },
                          "Status": False
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


def addSchedule(username, zone, monday, tuesday, wednesday, thursday, friday, saturday, sunday, time, duration):
    with MongoClient(dbURL, tlsCAFile=ca) as org:
        user_db = org["Users"]
        my_user = user_db[username]
        update = ""
        if monday:
            update = "Grid." + zone + ".Schedule.Day.Monday"
            my_user.update_one({}, {"$set": {update + ".Time": time, update + ".Duration": duration}})
        if tuesday:
            update = "Grid." + zone + ".Schedule.Day.Tuesday"
            my_user.update_one({}, {"$set": {update + ".Time": time, update + ".Duration": duration}})
        if wednesday:
            update = "Grid." + zone + ".Schedule.Day.Wednesday"
            my_user.update_one({}, {"$set": {update + ".Time": time, update + ".Duration": duration}})
        if thursday:
            update = "Grid." + zone + ".Schedule.Day.Thursday"
            my_user.update_one({}, {"$set": {update + ".Time": time, update + ".Duration": duration}})
        if friday:
            update = "Grid." + zone + ".Schedule.Day.Friday"
            my_user.update_one({}, {"$set": {update + ".Time": time, update + ".Duration": duration}})
        if saturday:
            update = "Grid." + zone + ".Schedule.Day.Saturday"
            my_user.update_one({}, {"$set": {update + ".Time": time, update + ".Duration": duration}})
        if sunday:
            update = "Grid." + zone + ".Schedule.Day.Sunday"
            my_user.update_one({}, {"$set": {update + ".Time": time, update + ".Duration": duration}})

        return True


def update_zone_status(username, zone):
    with MongoClient(dbURL, tlsCAFile=ca) as org:
        user_db = org["Users"]
        my_user = user_db[username]
        update = "Grid." + zone + ".Status"

        if zone == "Zone 1":
            my_user.update_one({}, {"$set": {update: True}})
        if zone == "Zone 2":
            my_user.update_one({}, {"$set": {update: True}})
        if zone == "Zone 3":
            my_user.update_one({}, {"$set": {update: True}})
        if zone == "Zone 4":
            my_user.update_one({}, {"$set": {update: True}})


def update_grid_zone_status(username):
    with MongoClient(dbURL, tlsCAFile=ca) as org:
        user_db = org["Users"]
        my_user = user_db[username]

        update = "Grid.Status"
        my_user.update_one({}, {"$set": {update: True}})

        return


def get_zone_schedules(username):
    with MongoClient(dbURL, tlsCAFile=ca) as org:
        user_db = org["Users"]
        my_user = user_db[username]
        zone1 = my_user.find_one({"Grid.Zone 1.Status": True})
        zone2 = my_user.find_one({"Grid.Zone 2.Status": True})
        zone3 = my_user.find_one({"Grid.Zone 3.Status": True})
        zone4 = my_user.find_one({"Grid.Zone 4.Status": True})

        # Extract the zone data from the 'Grid' field
        zone1_data = zone1['Grid']['Zone 1'] if zone1 else {}
        zone2_data = zone2['Grid']['Zone 2'] if zone2 else {}
        zone3_data = zone3['Grid']['Zone 3'] if zone3 else {}
        zone4_data = zone4['Grid']['Zone 4'] if zone4 else {}

        return zone1_data, zone2_data, zone3_data, zone4_data
    

def remove_scheduled_day(username, zone, day):
    with MongoClient(dbURL, tlsCAFile=ca) as org:
        user_db = org["Users"]
        my_user = user_db[username]
    
        update = "Grid." + zone + ".Schedule.Day." + day
        my_user.update_one({}, {"$set": {update + ".Time": "", update + ".Duration": ""}})

        return "Successfully updated scheduling in database"

