import React from 'react';

function ControlPanel() {
  const toggleLED = async () => {
    const response = await fetch('/api/controlLED', { method: 'POST' });
    const data = await response.json();
    console.log('LED State:', data.led_state);
  };

  return (
    <div>
      <button onClick={toggleLED}>Toggle LED on ESP32</button>
    </div>
  );
}

export default ControlPanel;
