import React, { useState, useEffect } from 'react';
import './Settings.css';
import axios from 'axios';

function Settings(){
    const [esp32Status, setEsp32Status] = useState({ connected: false, network: '' });
    const [systemStatus, setSystemStatus] = useState({
        battery: "Placeholder",
        waterLevel: "Placeholder"
      });

    //Comment out which one the test enviroment is not.
    // const API_URL = "http://10.159.64.194:5001";  //Local Host URL
    const API_URL = "http://oasis-flow.com";      //Website URL



    useEffect(() => {
        const esp32StatusSource = new EventSource(`${API_URL}/api/esp32-status-stream`);
        esp32StatusSource.onmessage = (event) => {
          const status = JSON.parse(event.data);
          setEsp32Status(status);
        };

        const batteryLevelSource = new EventSource(`${API_URL}/api/battery-level-stream`);
        batteryLevelSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setSystemStatus(prevState => ({
            ...prevState,
            battery: `${data.voltage} V` // Format as needed
        }));
        };


        return () => {
            esp32StatusSource.close();
            batteryLevelSource.close();
        };



    }, []);
    return(
        <div className="settings">
        <h1>Smart Irrigation Settings</h1>
        <div className="connection-status">
            <h2>Connection Status: </h2>
            <div className="status-indicator" style={{ backgroundColor: esp32Status.connected ? 'green' : 'red' }}></div>
            <span>{esp32Status.connected ? 'Connected' : 'Disconnected'}</span>
        </div>
        <h2>Wifi Network: {esp32Status.network}</h2>
        <h2>Battery Capacity: {systemStatus.battery}</h2> {/* You'll replace placeholders with actual data like you did for esp32Status */}
        <h2>Water Tank Capacity: </h2>
    </div>
    );
}

export default Settings;