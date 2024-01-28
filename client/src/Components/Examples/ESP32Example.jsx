import React, { useState, useEffect } from 'react';

function ControlPanel() {
  const [ledState, setLedState] = useState('off');

  useEffect(() => {
    // Fetch the current LED state from the Flask backend on component mount
    const fetchLedState = async () => {
      const response = await fetch('/api/led-state');
      const data = await response.json();
      setLedState(data.ledState);
    };

    fetchLedState();
  }, []);

  const toggleLED = async () => {
    // Toggle the LED state
    const newLedState = ledState === 'off' ? 'on' : 'off';

    await fetch('/api/led-control', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: newLedState }),
    });

    setLedState(newLedState); // Update the LED state in the component
  };

  return (
    <div>
      <p>LED is currently {ledState}</p>
      <button onClick={toggleLED}>Toggle LED</button>
    </div>
  );
}

export default ControlPanel;