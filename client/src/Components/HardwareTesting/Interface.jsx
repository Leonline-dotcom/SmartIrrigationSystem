import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Interface.css';  // Assume you have a CSS file for styles
//TODO change the .env to make it easier for test or real deployment


//Comment out which one the test enviroment is not.
// const API_URL = "http://10.159.69.70:5001";  //Local Host URL
const API_URL = "http://oasis-flow.com";      //Website URL


function Interface(){
    const [solState, setSolState] = useState({
        solenoid1: false,
        solenoid2: false,
        solenoid3: false,
        solenoid4: false,
      });

    const [systemStatus, setSystemStatus] = useState({
        battery: "Placeholder",
        waterLevel: "Placeholder",
        moistureSensor: "Placeholder",
      });

    const [esp32Status, setEsp32Status] = useState({ connected: false, network: '' });
    const [pumpStatus, setPumpStatus] = useState(false);

    useEffect(() => {
      const fetchSolenoidStates = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/solenoid-states`);
          console.log("Fetched solenoid states:", response.data);
          setSolState(response.data);  // Update the component's state with fetched data
        } catch (error) {
          console.error('Error fetching solenoid states:', error);
        }
      };

      const fetchPumpState = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/pump-state`)
          console.log("Fetched pump states: ", response.data)
          setPumpStatus(response.data)
        } catch (error) {
          console.error('Error fetching pump state:', error)
        }

      };

      const waterLevelSource = new EventSource(`${API_URL}/api/water-level-stream`);

      waterLevelSource.onmessage = (event) => {
          const newWaterLevel = JSON.parse(event.data);
          setSystemStatus((prevStatus) => ({
              ...prevStatus,
              waterLevel: newWaterLevel.waterLevel,
          }));
      };

      const esp32StatusSource = new EventSource(`${API_URL}/api/esp32-status-stream`);
      esp32StatusSource.onmessage = (event) => {
        const status = JSON.parse(event.data);
        setEsp32Status(status);
      };
  
      fetchSolenoidStates();
      fetchPumpState();
      return () => {
          waterLevelSource.close();
          esp32StatusSource.close();
      };
    }, []);

    const togglePump = async () => { // New function for toggling the pump
      const updatedPumpStatus = !pumpStatus
      console.log("Toggling pump status to:", updatedPumpStatus);
      try {
        const response = await axios.post(`${API_URL}/api/toggle-pump`, { pump: updatedPumpStatus }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log("Response from backend:", response.data);
        setPumpStatus(response.data.pumpStatus);
      } catch (error) {
        console.error('Error toggling pump:', error);
      }
    };


    const toggleSolenoid = async (solenoid) => {
      const updatedStates = { ...solState, [solenoid]: !solState[solenoid] };
      setSolState(updatedStates);
      console.log("Sending toggle request:", updatedStates);
      try {
        const response = await axios.post(`${API_URL}/api/toggle-solenoid`, updatedStates, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log("Response from backend:", response.data);
      } catch (error) {
        console.error('Error toggling solenoids:', error);
      }
    };
    

    return (
      <div>
        <div className="top-status-row">
          <div className="esp32-status">
            <h2>ESP32 Status</h2>
            <div className="status-indicator" style={{ backgroundColor: esp32Status.connected ? 'green' : 'red' }}></div>
            <p>{esp32Status.connected ? 'Connected' : 'Disconnected'}</p>
            {esp32Status.connected && <p>WiFi Network: {esp32Status.network}</p>}
          </div>
  
          <div className="pump-control">
            <h2>Pump Control</h2>
            <div className="status-indicator" style={{ backgroundColor: pumpStatus ? 'green' : 'red' }}></div>
            <button onClick={togglePump}>
              {pumpStatus ? 'Turn Off' : 'Turn On'}
            </button>
          </div>
        </div>
  
        <div className="interface-grid">
          {Object.entries(solState).map(([solenoid, isOn], index) => (
            <div key={solenoid} className={`solenoid-container solenoid-${index + 1}`}>
              <h2>{`Zone ${index + 1} Solenoid`}</h2>
              <div className="status-indicator" style={{ backgroundColor: isOn ? 'green' : 'red' }}></div>
              <button onClick={() => toggleSolenoid(solenoid)}>
                {isOn ? 'Turn Off' : 'Turn On'}
              </button>
            </div>
          ))}
        </div>
  
        <div className="system-status">
          <div className="status-item"><span>Battery: </span>{systemStatus.battery}</div>
          <div className="status-item"><span>Water Level: </span>{systemStatus.waterLevel}</div>
          <div className="status-item"><span>Moisture Sensor: </span>{systemStatus.moistureSensor}</div>
        </div>
      </div>
    );
}

export default Interface;