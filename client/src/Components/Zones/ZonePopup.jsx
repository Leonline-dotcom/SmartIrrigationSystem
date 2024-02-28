import React from 'react';
import './Modal.css'; 

function ZonePopup({ zone, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>{zone.name}</h2>
                <img src={zone.picture} alt={zone.name} />
                <p>Last Run: {zone.lastRun}</p>
                <p>Next Run: {zone.nextRun}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default ZonePopup;
