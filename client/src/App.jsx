import React, { useState, useEffect } from 'react';
import './App.scss'
import Dashboard from './Components/Dasboard/Dashboard'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Setup from './Components/Setup/ConnectionStatus'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'

// Testing changes
function App(){
  const [connectionInfo, setConnectionInfo] = useState({
    connected: false,
    ssid: '',
    password: ''
  });

  const pollInterval = 1000;

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch('http://oasis-flow.com/api/esp-status');
        const data = await response.json();
        setConnectionInfo(data);
      } catch (error) {
        console.error('Error fetching connection status:', error);
        setConnectionInfo({ connected: false, ssid: '', password: '' });
      }
    };

    checkConnection();

    const intervalId = setInterval(checkConnection, pollInterval);

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
  }
]);



  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App
