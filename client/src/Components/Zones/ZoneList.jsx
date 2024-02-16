import React, {useEffect, useState} from 'react'
import './Zones.css'
// import './Zone.jsx'
import ZonePreview from './ZonePreview';
import zone1Image from './Assets/Zone1.jpg';
import zone2Image from './Assets/Zone2.jpg';
import zone3Image from './Assets/Zone3.jpg';
import zone4Image from './Assets/Zone4.jpg';
import { Link, Outlet} from 'react-router-dom'

function ZoneList(){

    // const zones = [
    //     { id: 1, name: "Zone 1"},
    //     { id: 2, name: "Zone 2"},
    //     { id: 3, name: "Zone 3"},
    //     { id: 4, name: "Zone 4"}
    // ];

    const [zones, setZones] = useState([
        { id: 1, name: 'Zone 1', picture: zone1Image, lastRun: 'Date1', nextRun: 'Date2'},
        { id: 2, name: 'Zone 2', picture: zone2Image, lastRun: 'Date1', nextRun: 'Date2'},
        { id: 3, name: 'Zone 3', picture: zone3Image, lastRun: 'Date1', nextRun: 'Date2'},
        { id: 4, name: 'Zone 4', picture: zone4Image, lastRun: 'Date1', nextRun: 'Date2'}
    ]);

    useEffect(() => {
        // Fetch zones' data including last run, next run, etc.
        // setZones(fetchedData);
    }, []);

    return (
        // <div>
        //     <div className='zoneList-container'>
        //         {zones.map(zone => (
        //             <Link to={`/zones/${zone.id}`} key={zone.id} className='zone-item'>
        //                 <a>
        //                     {zone.name}
        //                 </a>
        //             </Link>
        //         ))}
        //     </div>
        //     <Outlet/>
        // </div>
        <div className='zoneList-container'>
            {zones.map(zone => (
                <ZonePreview key={zone.id} zone={zone} /> // Extract each zone's presentation
            ))}
        </div>
    );
}

export default ZoneList;

