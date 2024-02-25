import React, {useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

export default function Calender(){
    const [showPopup, setShowPopup] = useState(false);

    const handleAddButtonClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div>
            <Calendar />
            {!showPopup && (<button onClick={handleAddButtonClick}>Add</button>)}
            {showPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <button className="close-btn" onClick={handleClosePopup}>Close</button>
                        <h2>Add Event</h2>
                        <label htmlFor="zone">Select Zone:</label>
                        <select id="zone" name="zone">
                            <option value="Zone 1">Zone 1</option>
                            <option value="Zone 2">Zone 2</option>
                            <option value="Zone 3">Zone 3</option>
                            <option value="Zone 4">Zone 4</option>
                        </select>
                        <div>
                            <label>Days:</label><br />
                            <input type="checkbox" id="sunday" name="sunday" />
                            <label htmlFor="sunday">Sunday</label>
                            <input type="checkbox" id="monday" name="monday" />
                            <label htmlFor="monday">Monday</label>
                            <input type="checkbox" id="tuesday" name="tuesday" />
                            <label htmlFor="tuesday">Tuesday</label>
                            <input type="checkbox" id="wednesday" name="wednesday" />
                            <label htmlFor="wednesday">Wednesday</label>
                            <input type="checkbox" id="thursday" name="thursday" />
                            <label htmlFor="thursday">Thursday</label>
                            <input type="checkbox" id="friday" name="friday" />
                            <label htmlFor="friday">Friday</label>
                            <input type="checkbox" id="saturday" name="saturday" />
                            <label htmlFor="saturday">Saturday</label>
                            {/* Repeat for other days */}
                        </div>
                        <div>
                            <label htmlFor="time">Time:</label>
                            <input type="time" id="time" name="time" />
                        </div>
                        <div>
                            <label htmlFor="duration">Duration:</label>
                            <input type="text" id="duration" name="duration" />
                        </div>
                        {/* Add more input fields as needed */}
                    </div>
                </div>
            )}
        </div>
    );
}