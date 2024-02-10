import React, {useEffect, useState} from 'react'
import { useParams, useNavigate} from 'react-router-dom';
import './Zones.css'
// import './ZoneList.jsx'
import { Link } from 'react-router-dom'

function Zone(){
    let { zoneId } = useParams();
    let navigate = useNavigate();

    function goBack() {
        navigate('/zones');
    }
    
    return (
        <div className='zone-container'>
            <h2>Details for Zone {zoneId}</h2>
            {/* <Calendar zoneId={zoneId} /> */}
            {/* <Timer zoneId={zoneId} /> */}
            <button onClick={goBack}>Back</button>

        </div>
    );
}

export default Zone;