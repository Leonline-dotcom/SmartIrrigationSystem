import React, { useState, useEffect } from 'react';
import './App.scss'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import ZoneOverview from './Components/Zones/ZoneOverview'
import Interface from './Components/HardwareTesting/Interface'
import Countdown1 from './Components/Zones/CountdownTimer'
import Countdown2 from './Components/Zones/Timer'
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
    path: 'countdown1',
    element: <Countdown1/>
  },
  {
    path: 'countdown2',
    element: <Countdown2/>
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
