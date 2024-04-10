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
        
        return


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

        # Return true/false based on whether there are scheduled days for the respective zone
        return has_scheduled_days(my_user, zone)
        # return "Successfully updated scheduling in database"
    

def has_scheduled_days(my_user, zone):
    with MongoClient(dbURL, tlsCAFile=ca) as org:
        # Access the Schedule data for the specified zone
        schedule_data = my_user.find_one({}, {"Grid." + zone + ".Schedule.Day": 1})

        if schedule_data and "Grid" in schedule_data and zone in schedule_data["Grid"]:
            # Extract the Schedule data for the specified zone
            zone_schedule = schedule_data["Grid"][zone]["Schedule"]["Day"]

            # Iterate over the days and check if any have scheduled time and duration
            for day_data in zone_schedule.values():
                if day_data["Time"] and day_data["Duration"]:
                    return True

        # No scheduled days found for the zone
        return False


def remove_zone_status(username, zone):
    with MongoClient(dbURL, tlsCAFile=ca) as org:
        user_db = org["Users"]
        my_user = user_db[username]
        update = "Grid." + zone + ".Status"
        my_user.update_one({}, {"$set": {update: False}})
        
        return
    
def retrieve_all_schedules():
    with MongoClient(dbURL, tlsCAFile=ca) as org:
        usersDB = org["Users"]
        all_schedules = []
        usersCols = usersDB.list_collection_names()
        
        for username in usersCols:
            userCollection = usersDB[username]
            user_data = userCollection.find_one()
            
            # Proceed only if 'Grid' is present and is a dict
            if user_data and 'Grid' in user_data and isinstance(user_data['Grid'], dict):
                for zone, zone_details in user_data['Grid'].items():
                    # Skip if not a dict or 'Status' is False
                    if not isinstance(zone_details, dict) or not zone_details.get('Status', False):
                        continue
                    
                    schedule_details = zone_details.get('Schedule', {}).get('Day', {})
                    
                    # Ensure schedule_details is a dict
                    if not isinstance(schedule_details, dict):
                        continue
                    
                    for day, timing in schedule_details.items():
                        # Ensure timing is a dict with 'Time' and 'Duration'
                        if isinstance(timing, dict) and 'Time' in timing and 'Duration' in timing:
                            all_schedules.append({
                                "username": username,
                                "zone": zone,
                                "day": day,
                                "time": timing["Time"],
                                "duration": timing["Duration"]
                            })
    
    return all_schedules




