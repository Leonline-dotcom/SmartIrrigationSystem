function ConnectionStatus({ connectionInfo, onConnect }) {
  // console.log("Connection Info:", connectionInfo);
    return (
      <div>
        <div 
          style={{ 
            height: '20px', 
            width: '20px', 
            backgroundColor: connectionInfo.connected ? 'green' : 'red',
            borderRadius: '50%', 
            margin: '10px auto'
          }} 
        />
        <p>
          {connectionInfo.connected  
            ? "Successfully connected to the ${connectionInfo.ssid} wifi network" 
            : "Go to the settings of your device and connect to the WiFi network Smart Irrigation System."}
        </p>
        <button onClick={onConnect} disabled={!connectionInfo.connected}>
          Go to WiFi Selection
        </button>
      </div>
    );
}
  
export default ConnectionStatus;
