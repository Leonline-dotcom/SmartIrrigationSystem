import React, { useState } from 'react';
import './Zones.css';
import ZonePopup from './ZonePopup'; 
import zone1Image from './Assets/Zone1.jpg';
import zone2Image from './Assets/Zone2.jpg';
import zone3Image from './Assets/Zone3.jpg';
import zone4Image from './Assets/Zone4.jpg';

function ZoneOverview() {
    const [selectedZone, setSelectedZone] = useState(null);

    const zones = [
        { id: 1, name: 'Zone 1', picture: zone1Image, lastRun: 'Date1', nextRun: 'Date2'},
        { id: 2, name: 'Zone 2', picture: zone2Image, lastRun: 'Date1', nextRun: 'Date2'},
        { id: 3, name: 'Zone 3', picture: zone3Image, lastRun: 'Date1', nextRun: 'Date2'},
        { id: 4, name: 'Zone 4', picture: zone4Image, lastRun: 'Date1', nextRun: 'Date2'}
    ];

    const handleZoneClick = (zone) => {
        setSelectedZone(zone);
    };

    return (
        <div className='zoneOverview-container'>
            {zones.map(zone => (
                <div key={zone.id} className='zone-item' onClick={() => handleZoneClick(zone)}>
                    <img src={zone.picture} alt={zone.name}/>
                    <h3>{zone.name}</h3>
                </div>
            ))}
            {selectedZone && <ZonePopup zone={selectedZone} onClose={() => setSelectedZone(null)} />}
        </div>
    );
}

export default ZoneOverview;