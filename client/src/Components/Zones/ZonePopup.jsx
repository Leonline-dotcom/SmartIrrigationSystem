import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './Modal.css'; 
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { duration } from '@mui/material';


//Comment out which one the test enviroment is not.
const API_URL = "http://10.159.66.73:5001";  //Local Host URL
// const API_URL = "http://oasis-flow.com";      //Website URL


function ZonePopup({ zone, onClose }) {
    const [isTimerPlaying, setIsTimerPlaying] = useState(false);
    const [inputValues, setInputValues] = useState({ hours: '', minutes: '', seconds: '' });
    const [timerDuration, setTimerDuration] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [timerKey, setTimerKey] = useState(0);

    // const totalDurationInSeconds = () => timerDuration.hours * 3600 + timerDuration.minutes * 60 + timerDuration.seconds;
    
    const totalDurationInSeconds = () => {
        const hoursInSeconds = parseInt(inputValues.hours || 0) * 3600;
        const minutesInSeconds = parseInt(inputValues.minutes || 0) * 60;
        const seconds = parseInt(inputValues.seconds || 0);
        return hoursInSeconds + minutesInSeconds + seconds;
    };

    const handleReset = () => {
        setInputValues({ hours: '', minutes: '', seconds: '' });
        setTimerKey(prevKey => prevKey + 1);
        setIsTimerPlaying(false);
    };


    const handleDurationChange = ({ target: { name, value } }) => {
        let numericalValue = parseInt(value, 10);

        if (isNaN(numericalValue) || numericalValue < 0) {
            numericalValue = 0;
        }

        setInputValues(prev => ({
            ...prev,
            [name]: numericalValue.toString()
        }));

        setTimerDuration(prev => ({
            ...prev,
            [name]: numericalValue
        }));
    };

    const runZone = async () => {
        // const durationInSeconds = totalDurationInSeconds();
        setIsTimerPlaying(true);
        // setTimerKey(prevKey => prevKey +1);
        try {
            const response = await axios.post(`${API_URL}/api/solenoid-control`, {
                solenoidId: `solenoid${zone.id}`,
                status: true, // true for turning on
                duration: durationInSeconds
            });
            console.log('Solenoid is running!', response.data);
        } catch (error) {
            console.error('Run: Error starting solenoid:', error);
            // alert('Failed to start solenoid.');
            setIsTimerPlaying(false);
        }
        // handleReset();
    };

    const stopZone = async () => {
        setIsTimerPlaying(false);
        try {
            const response = await axios.post(`${API_URL}/api/solenoid-control`, {
                solenoidId: `solenoid${zone.id}`,
                status: false
            });
            console.log('Solenoid is stopped!', response.data);
        } catch (error) {
            console.error('Stop: Error stopping solenoid:', error);
        } finally {
            handleReset();
        }
    };

    const durationInSeconds = totalDurationInSeconds();

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-body">
                    <div className="zone-details">
                        <img src={zone.picture} alt={zone.name} />
                        <h1>{zone.name}</h1>
                        <p>Moisture: {zone.moistureLevel}%</p>
                        <p>Last Run: {zone.lastRun}</p>
                        <p>Next Run: {zone.nextRun}</p>
                    </div>
                    <div className="quick-run">
                        <h4>Quick Run</h4>
                        <CountdownCircleTimer
                            key={timerKey}
                            isPlaying={isTimerPlaying}
                            // duration={timerDuration.hours * 3600 + timerDuration.minutes * 60 + timerDuration.seconds}
                            duration={totalDurationInSeconds()}
                            colors="#008b8b"
                            size={150}
                            onComplete={handleReset}
                        >
                            {({ remainingTime }) => {
                                const hours = String(Math.floor(remainingTime / 3600)).padStart(2, '0');
                                const minutes = String(Math.floor((remainingTime % 3600) / 60)).padStart(2, '0');
                                const seconds = String(remainingTime % 60).padStart(2, '0');
                                return <div>{`${hours}:${minutes}:${seconds}`}</div>;
                            }}
                        </CountdownCircleTimer>
                        <div className="duration-inputs">
                            <label>
                                Duration:
                                <input type="number" name="hours" min="0" placeholder="H" value={inputValues.hours} onChange={handleDurationChange} />
                                <input type="number" name="minutes" min="0" max="59" placeholder="M" value={inputValues.minutes} onChange={handleDurationChange} />
                                <input type="number" name="seconds" min="0" max="59" placeholder="S" value={inputValues.seconds} onChange={handleDurationChange} />
                            </label>
                        </div>
                        <button onClick={isTimerPlaying ? stopZone : runZone}>
                            {isTimerPlaying ? "Stop" : "Run"}
                        </button>
                    </div>
                </div>
                <div className="modal-footer">
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default ZonePopup;
