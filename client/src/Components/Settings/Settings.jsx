import React, { useState, useEffect } from 'react';
import './Settings.css';
import axios from 'axios';

function Settings() {
    const [esp32Status, setEsp32Status] = useState({ connected: false, network: '' });
    const [systemStatus, setSystemStatus] = useState({
        battery: "Placeholder",
        waterLevel: "Placeholder"
    });

    const API_URL = "http://localhost:5001";  //Local Host URL
    // const API_URL = "http://oasis-flow.com";      //Website URL

    useEffect(() => {
        const initiateSSE = (url, onMessage) => {
            const source = new EventSource(url);

            source.onmessage = (event) => {
                const data = JSON.parse(event.data);
                onMessage(data);
            };

            source.onerror = (error) => {
                console.error("SSE error:", error);
                source.close(); 
                setTimeout(() => initiateSSE(url, onMessage), 5000);
            };

            return source;
        };

        const esp32StatusSource = initiateSSE(`${API_URL}/api/esp32-status-stream`, (data) => {
            setEsp32Status(data);
        });

        const batteryLevelSource = initiateSSE(`${API_URL}/api/battery-level-stream`, (data) => {
            setSystemStatus(prevState => ({
                ...prevState,
                battery: `${data.batterySOC}%`
            }));
        });

        const waterLevelSource = initiateSSE(`${API_URL}/api/water-level-stream`, (data) => {
            setSystemStatus(prevState => ({
                ...prevState,
                waterLevel: `${data.waterLevel} cm`
            }));
        });

        return () => {
            esp32StatusSource.close();
            batteryLevelSource.close();
            waterLevelSource.close();
        };

    }, [API_URL]);

    return (
        <div className="settings">
            <h1 className="settings-title">Smart Irrigation Settings</h1>
            <div className="connection-status">
                <h2 className="status-heading">Connection Status: </h2>
                <div className={`status-indicator ${esp32Status.connected ? 'connected' : 'disconnected'}`}></div>
                <span className="status-text">{esp32Status.connected ? 'Connected' : 'Disconnected'}</span>
            </div>
            <div className="data-container">
                <h2 className="data-heading">Wifi Network:</h2>
                <span className="data-value">{esp32Status.network}</span>
            </div>
            <div className="data-container">
                <h2 className="data-heading">Battery Capacity:</h2>
                <span className="data-value">{systemStatus.battery}</span>
            </div>
            <div className="data-container">
                <h2 className="data-heading">Water Tank Capacity:</h2>
                <span className="data-value">{systemStatus.waterLevel}</span>
            </div>
        </div>
    );
}

export default Settings;
