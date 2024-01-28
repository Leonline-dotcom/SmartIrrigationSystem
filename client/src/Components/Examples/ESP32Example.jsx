import React from 'react';

function ControlPanel() {
  const toggleLED = async () => {
    try {
      const response = await fetch('/api/led-control', { 
        method: 'GET' // Or 'POST' if changing the state
      });
      const { ledState } = await response.json();
      console.log('LED State:', ledState);
      // Update component state or UI based on the response if needed
    } catch (error) {
      console.error('Error toggling LED:', error);
    }
  };


  return (
    <div>
      <button onClick={toggleLED}>Toggle LED on ESP32</button>
    </div>
  );
}

export default ControlPanel;
