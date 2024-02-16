import React from 'react';
import { Link } from 'react-router-dom';
import './Zones.css';

function ZonePreview ({ zone }) {
    return (
        <Link to={`/zones/${zone.id}`} className='zone-item'>
            <img src={zone.picture} 
            // alt={zone.name} 
            /> {/* Placeholder or actual image */}
            <h3>{zone.name}</h3>
            <p>Last Run: {zone.lastRun}</p>
            <p>Next Run: {zone.nextRun}</p>
        </Link>
    );
}

export default ZonePreview;