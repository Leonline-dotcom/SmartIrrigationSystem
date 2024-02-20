import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Interface.css';  // Assume you have a CSS file for styles
//TODO change the .env to make it easier for test or real deployment


//Comment out which one the test enviroment is not.
// const API_URL = "http://10.145.23.255:5001";  //Local Host URL
const API_URL = "http://oasis-flow.com";      //Website URL


function Interface(){
    const [solState, setSolState] = useState({
        solenoid1: false,
        solenoid2: false,
        solenoid3: false,
        solenoid4: false,
      });

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
  
      fetchSolenoidStates();
    }, []);


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
    );
}

export default Interface;