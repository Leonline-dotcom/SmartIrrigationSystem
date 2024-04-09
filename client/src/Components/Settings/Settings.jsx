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
    const API_URL = "http://10.159.66.192:5001";  //Local Host URL
    // const API_URL = "http://oasis-flow.com";      //Website URL



    useEffect(() => {
        // Function to initiate the SSE connection and handle incoming messages.
        const initiateSSE = (url, onMessage) => {
            const source = new EventSource(url);

            source.onmessage = (event) => {
                const data = JSON.parse(event.data);
                onMessage(data);
            };

            source.onerror = (error) => {
                console.error("SSE error:", error);
                source.close(); // Close the existing connection

                // Attempt to reconnect after a timeout
                setTimeout(() => initiateSSE(url, onMessage), 5000);
            };

            return source;
        };

        // Establishing SSE connections for ESP32 status and battery level
        const esp32StatusSource = initiateSSE(`${API_URL}/api/esp32-status-stream`, (data) => {
            setEsp32Status(data);
        });

        const batteryLevelSource = initiateSSE(`${API_URL}/api/battery-level-stream`, (data) => {
            setSystemStatus(prevState => ({
                ...prevState,
                battery: `${data.voltage} V` // Format as needed
            }));
        });

        // Cleanup function to close the SSE connections when the component unmounts or re-renders
        return () => {
            esp32StatusSource.close();
            batteryLevelSource.close();
        };

    }, [API_URL]); // Dependency array to re-run the effect if API_URL changes

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