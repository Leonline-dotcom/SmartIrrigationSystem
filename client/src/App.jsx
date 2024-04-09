import React, { useState, useEffect } from 'react';
import './App.scss'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import ZoneOverview from './Components/Zones/ZoneOverview'
import Interface from './Components/HardwareTesting/Interface';
import Settings from './Components/Settings/Settings'
// import Setup from './Components/Setup/ConnectionStatus'
// import ESP32 from './Components/Examples/ESP32Example'
// import Template from './Components/Examples/Templates'
// import Zones from './Components/Zones/ZoneList'
import ZoneOverview from './Components/Zones/ZoneOverview'
import WaterCap from './Components/TankCapacity/WaterCap'
import Weather from  './Components/Weather Display/Weather'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'

function App(){

//Router
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
    path: '/zones',
    element: <ZoneOverview/>,
  },
  {
    path: '/interface',
    element: <Interface/>
  },
  {
    path: '/settings',
    element: <Settings/>
  },
  {
    path: '/capacity',
    element: <WaterCap/>
  },
  {
    path: '/weather',
    element: <Weather/>
  }
]);

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App
