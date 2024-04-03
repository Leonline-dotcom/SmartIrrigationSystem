import React, { useState, useEffect } from 'react';
import './App.scss'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Setup from './Components/Setup/ConnectionStatus'
import ESP32 from './Components/Examples/ESP32Example'
import Template from './Components/Examples/Templates'
import Zones from './Components/Zones/ZoneList'
import Zone from './Components/Zones/Zone'
import WaterCap from './Components/TankCapacity/WaterCap'
import Weather from  './Components/Weather Display/Weather'
import Interface from './Components/Examples/Interface';
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
  }
  // {
  //   path: '/capacity',
  //   element: <WaterCap/>
  // },
  // {
  //   path: '/weather',
  //   element: <Weather/>
  // }
]);

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App
