import React, { useState, useEffect } from 'react';
import './App.scss'
import Dashboard from './Components/Dasboard/Dashboard'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Setup from './Components/Setup/ConnectionStatus'
// Enable Routing!
import {createBrowserRouter, RouterProvider } from 'react-router-dom'

// Testing changes
function App(){
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Replace URL with your ESP32 or backend endpoint
        // const response = await fetch('http://oasis-flow.com/connection_status');
        const response = await fetch('http://oasis-flow.com/api/esp-status');
        const data = await response.json();
        setIsConnected(data.connected);
      } catch (error) {
        console.error('Error fetching connection status:', error);
        setIsConnected(false);
      }
    };

    checkConnection();
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
    element: <div><Setup/></div>
  }
]);



  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App
