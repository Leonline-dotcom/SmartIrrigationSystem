import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import axios from 'axios';

 const API_URL = "http://localhost:5001";  //Local Host URL
//const API_URL = "http://oasis-flow.com";      //Website URL

export default function CalendarPage() {
    const [zoneData, setZoneData] = useState({
        zone: "Zone 1",
        monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: false,
        time: "",
        duration: ""
    });

    const [zoneStatus, setZoneStatus] = useState({
        Zone1: {}, Zone2: {}, Zone3: {}, Zone4: {}
    });

    function handleChange(event) {
        const { name, value, type, checked } = event.target;
        setZoneData(prevZoneData => ({
            ...prevZoneData,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    const [showPopup, setShowPopup] = useState(false);

    const handleAddButtonClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleRemoveDay = (zone, day) => {
        // Implement removal logic here
        console.log("Remove day", zone, day);
        fetch(`${API_URL}/api/remove_day`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({zone, day})
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                fetchZoneStatus(); // Fetch updated zone data after removing a schedule
            });
        if (zoneData.found) {
            Navigate({ to: '/Calendar' });
        }
    };

    function handleSubmit(event) {
        event.preventDefault();
        fetch(`${API_URL}/api/Calendar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(zoneData)
        }).then(res => res.json())
            .then(data => {
                setZoneData(prevZoneData => ({
                    ...prevZoneData,
                    [zoneData.found]: data.found
                }));
                console.log(data);
                fetchZoneStatus(); // Fetch updated zone data after adding a schedule
            });
        if (zoneData.found) {
            Navigate({ to: '/Calendar' });
        }
    }

    useEffect(() => {
        fetchZoneStatus();
    }, []);

    const fetchZoneStatus = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/Calendar`);
            console.log("Fetched zone status:", response.data);
            setZoneStatus(response.data);
        } catch (error) {
            console.error('Error fetching zone states:', error);
        }
    };

    const renderTileContent = ({ date, view }) => {
        if (view === 'month') {
            const day = date.toLocaleDateString('en-US', { weekday: 'long' });
            const zoneColors = {
                'Zone 1': 'blue',
                'Zone 2': 'red',
                'Zone 3': 'green',
                'Zone 4': 'orange'
            };
    
            // Collect all scheduled zones for the day
            const scheduledZones = Object.entries(zoneStatus)
                .filter(([zone, data]) => 
                    data.Status && 
                    data.Schedule.Day[day] && 
                    data.Schedule.Day[day].Time !== "" && 
                    data.Schedule.Day[day].Duration !== ""
                )
                .map(([zone]) => (
                    <div key={`${zone}-${day}`} style={{ color: zoneColors[zone], fontSize: '0.7em', marginRight: '5px' }}>■</div>
                ));
    
            // If there are scheduled zones, return a div containing all the colored boxes
            if (scheduledZones.length > 0) {
                return (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>{scheduledZones}</div>
                    </div>
                );
            }
        }
        return null;
    };
    
    

    return (
        <div className="calendar-page">
            <div className="calendar-container">
                <Calendar
                    style={{ flexGrow: 1 }}
                    tileContent={renderTileContent}
                />
            </div>
            <div className="zone-data">
                <div className="active-zones-container">
                    <h2>Active Zones</h2>
                    <div className="add-schedule-container">
                        <button className="add-button" onClick={handleAddButtonClick}>
                            Add Schedule
                        </button>
                    </div>
                </div>
                <div className="zones-container">
                {Object.entries(zoneStatus).map(([zone, data]) => (
    <div key={zone} className={`zone-item zone-${zone.toLowerCase().replace(/\s+/g, '-')}`}>
        {data.Status ? (
            <>
                <h3>{zone}</h3>
                <div className="zone-details">
                    {Object.entries(data.Schedule.Day).map(([day, schedule]) => (
                        schedule.Time !== "" && schedule.Duration !== "" && (
                            <div key={day} className="zone-detail">
                                <span className="detail-label">{day}: </span>
                                <span className="detail-value">
                                    Time: {schedule.Time}, Duration: {schedule.Duration}
                                    <button
                                        className="remove-button"
                                        onClick={() => handleRemoveDay(zone, day)}
                                    >
                                        Remove
                                    </button>
                                </span>
                            </div>
                        )
                    ))}
                </div>
            </>
        ) : (
            <>
                <h3>{zone}</h3>
                <p>Not currently scheduled</p>
            </>
        )}
    </div>
))}

                </div>
            </div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <button className="close-btn" onClick={handleClosePopup}>
                            Close
                        </button>
                        <div className="popup-title">
                            <h2>Schedule Zone</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <label className="select-zone-title" htmlFor="zone">Select Zone:</label>
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
                            <button className="submit-button" type="submit">
                                <span>Submit</span>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
