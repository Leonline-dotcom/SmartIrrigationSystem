import React, { useState } from 'react';
import './Interface.css';  // Assume you have a CSS file for styles

//TODO change the .env to make it easier for test or real deployment


//Comment out which one the test enviroment is not.
// const API_URL = "http://10.154.79.185:5001";  //Local Host URL
const API_URL = "http://oasis-flow.com";      //Website URL

function Interface(){
    const [solState, setSolState] = useState({
        solenoid1: false,
        solenoid2: false,
        solenoid3: false,
        solenoid4: false,
      });

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);


    const toggleSolenoid = async (solenoid) => {
      const newState = !solState[solenoid];
      const updatedStates = { ...solState, [solenoid]: newState };

      setSolState(updatedStates);

      console.log(`Toggling ${solenoid}: ${newState}`);  // Log the solenoid being toggled and its new state
      console.log("Updated States:", updatedStates);  // Log the updated states being sent to the backend
      try {
          const response = await fetch(`${API_URL}/api/toggle-solenoids`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedStates),
          });

          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          console.log(await response.json());
          console.log("Response from backend:", responseData);  // Log the response from the backend
      } catch (error) {
          console.error('Error toggling solenoids:', error);
          setSolState(prevState => ({
              ...prevState,
              [solenoid]: !newState
          }));
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