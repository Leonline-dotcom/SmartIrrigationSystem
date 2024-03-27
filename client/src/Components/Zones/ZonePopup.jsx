import React from 'react';
import './Modal.css'; 
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function ZonePopup({ zone, onClose }) {

    const timerDuration = 10;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{zone.name}</h2>
                </div>
                <div className="modal-body">
                    <img src={zone.picture} alt={zone.name} />
                    <div className="timer-container">
                        <CountdownCircleTimer
                            isPlaying
                            duration={timerDuration}
                            colors="#008b8b"
                            size={120} // Size of the timer
                        >
                            {({ remainingTime }) => <div>{remainingTime}</div>}
                        </CountdownCircleTimer>
                        <p>Time until next run</p>
                    </div>
                </div>
                <div className="modal-footer">
                    <p>Last Run: {zone.lastRun}</p>
                    <p>Next Run: {zone.nextRun}</p>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default ZonePopup;
