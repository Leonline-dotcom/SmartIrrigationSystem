function ConnectionStatus({ isConnected, onConnect }) {
    return (
      <div>
        <div 
          style={{ 
            height: '20px', 
            width: '20px', 
            backgroundColor: isConnected ? 'green' : 'red', 
            borderRadius: '50%', 
            margin: '10px auto'
          }} 
        />
        <p>
          {isConnected 
            ? "Successfully connected to the ____ wifi network" 
            : "Go to the settings of your device and connect to the WiFi network Smart Irrigation System."}
        </p>
        <button onClick={onConnect} disabled={!isConnected}>
          Go to WiFi Selection
        </button>
      </div>
    );
}
  
export default ConnectionStatus;
