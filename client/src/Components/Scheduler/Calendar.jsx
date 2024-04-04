import React, {useEffect, useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'
import {Navigate} from "react-router-dom";
import axios from 'axios'

export default function Calender(){
    const [zoneData, setZoneData] = useState(
        { zone: "Zone 1",
        monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: false,
        time: "",
        duration: ""}
    )

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setZoneData(prevZoneData => {
            return {
                ...prevZoneData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    const [showPopup, setShowPopup] = useState(false);

    const handleAddButtonClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    function handleSubmit(event) {
        event.preventDefault()
        fetch("http://localhost:5001/Calendar", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(zoneData)
        }).then(
            res => res.json()
        ).then(
         data => {
           setZoneData(prevUserData => {
               return {
                    ...prevUserData,
                    [zoneData.found]: data.found
               }
            })
           console.log(data)
         }
     )
     if (zoneData.found) {
         Navigate({to: '/Calendar'})
     }
    }

    useEffect(() => {
      const fetchSolenoidStates = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/solenoid-states`);
          console.log("Fetched solenoid states:", response.data);
          setSolState(response.data);  // Update the component's state with fetched data
        } catch (error) {
          console.error('Error fetching solenoid states:', error);
        }
      };
    }, []);

    return (
        <div>
            <div className="calendar-container">
                <Calendar />
            </div>
            <div className="action-container">
            {!showPopup && (
            <button className="add-button" onClick={handleAddButtonClick}>
                Add
            </button>
            )}
            <div className="popup">
            {showPopup && (
            <div className="popup-inner">
                <button className="close-btn" onClick={handleClosePopup}>
                    Close
                </button>
                <h2>Schedule Zone</h2>
                <form onSubmit={handleSubmit}>
                <label htmlFor="zone">Select Zone:</label>
                <select id="zone" name="zone" onChange={handleChange} value={zoneData.zone}>
                    <option value="Zone 1">Zone 1</option>
                    <option value="Zone 2">Zone 2</option>
                    <option value="Zone 3">Zone 3</option>
                    <option value="Zone 4">Zone 4</option>
                </select>
                <div className="days-container">
                    <label>Days:</label>
                    <input type="checkbox" id="sunday" name="sunday" onChange={handleChange} checked={zoneData.sunday}/>
                    <label htmlFor="sunday">Sunday</label>
                    <input type="checkbox" id="monday" name="monday" onChange={handleChange} checked={zoneData.monday}/>
                    <label htmlFor="monday">Monday</label>
                    <input type="checkbox" id="tuesday" name="tuesday" onChange={handleChange} checked={zoneData.tuesday}/>
                    <label htmlFor="tuesday">Tuesday</label>
                    <input type="checkbox" id="wednesday" name="wednesday" onChange={handleChange} checked={zoneData.wednesday}/>
                    <label htmlFor="wednesday">Wednesday</label>
                    <input type="checkbox" id="thursday" name="thursday" onChange={handleChange} checked={zoneData.thursday}/>
                    <label htmlFor="thursday">Thursday</label>
                    <input type="checkbox" id="friday" name="friday" onChange={handleChange} checked={zoneData.friday}/>
                    <label htmlFor="friday">Friday</label>
                    <input type="checkbox" id="saturday" name="saturday" onChange={handleChange} checked={zoneData.saturday}/>
                    <label htmlFor="saturday">Saturday</label>
                    {/* Repeat for other days */}
                </div>
                <div className="time-container">
                    <label htmlFor="time">Time:</label>
                    <input type="time" id="time" name="time" onChange={handleChange} value={zoneData.time}/>
                </div>
                <div className="duration-container">
                    <label htmlFor="duration">Duration:</label>
                    <input type="text" id="duration" name="duration" onChange={handleChange} value={zoneData.duration}/>
                </div>
                    <button>
                        <span>Submit</span>
                    </button>
                    </form>
            </div>
            )}
                </div>
            </div>
        </div>
    );
}