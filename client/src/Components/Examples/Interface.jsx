import React, { useState } from 'react';
import './Interface.css';  // Assume you have a CSS file for styles

function Interface(){
    const [solState, setSolState] = useState({
        solenoid1: false,
        solenoid2: false,
        solenoid3: false,
        solenoid4: false,
      });

    const toggleSolenoid = async (solenoid) => {
        const newState = !solState[solenoid];

        setSolState(prevState => ({
            ...prevState,
            [solenoid]: newState
        }));

        try {
            // http://10.147.74.162:5001/api/toggle-solenoid/${solenoid}
            const response = await fetch(`http://oasis-flow.com/api/toggle-solenoid/${solenoid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newState }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Handle response data here if needed
            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.error('Error toggling solenoid:', error);
            // Optionally, revert the state if the API call fails
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