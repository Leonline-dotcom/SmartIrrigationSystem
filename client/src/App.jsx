import React, { useState, useEffect } from 'react';
import './App.scss'
import Dashboard from './Components/Dasboard/Dashboard'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Setup from './Components/Setup/ConnectionStatus'
import ESP32 from './Components/Examples/ESP32Example'
import Template from './Components/Examples/Templates'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'

// Testing changes
function App(){
  const [connectionInfo, setConnectionInfo] = useState({
    connected: false,
    ssid: '',
    password: ''
  });

  const pollInterval = 1000;
  //TODO Austin needs to clear App.jsx and put it in its appropriate component.
  useEffect(() => {
    let intervalId = null;

    const checkConnection = async () => {
      try {
        // const response = await fetch('http://oasis-flow.com/api/esp-status');
        const response = await fetch('http://localhost:5001/api/esp-status');
        const data = await response.json();
        console.log('Received data:', data);
        setConnectionInfo(data);
      } catch (error) {
        console.error('Error fetching connection status:', error);
        setConnectionInfo({ connected: false, ssid: 'Error', password: 'Error' });
      }
    };

    checkConnection();
    
    intervalId = setInterval(checkConnection, pollInterval);

    return () => clearInterval(intervalId);
  }, []);

//create router
const router = createBrowserRouter([
  {
    path:'/*',
    element: <div><Login/></div>
  },
  {
    path:'/register',
    element: <div><Register/></div>
  },
  {
    path:'/dashboard',
    element: <div><Dashboard/></div>
  },
  {
    path:'/setup',
    element: <Setup connectionInfo={connectionInfo} />
  },
  {
    path:'/esp32',
    element: <ESP32/>
  },
  {
    path:'/template',
    element: <Template/>
  }
]);



  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App
