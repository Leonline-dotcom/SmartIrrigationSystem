import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink} from 'react-router-dom'
import { Sidebar, Menu, MenuItem,} from 'react-pro-sidebar';
import { FaList, FaThLarge, FaCog, FaCalendarAlt } from 'react-icons/fa';
import './App.scss'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import ZoneOverview from './Components/Zones/ZoneOverview'
import Interface from './Components/HardwareTesting/Interface';
import Settings from './Components/Settings/Settings'
import WaterCap from './Components/TankCapacity/WaterCap'
import Weather from  './Components/Weather Display/Weather'
// import Setup from './Components/Setup/ConnectionStatus'
// import ESP32 from './Components/Examples/ESP32Example'
// import Template from './Components/Examples/Templates'
// import Zones from './Components/Zones/ZoneList'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'


function SidebarComponent(){
  const [collapsed, setCollapsed] = useState(false);

  const activeLinkStyle= {
    backgroundColor: '#1976d2', // Adjust the color to match your theme
  };

  const menuItem = (to, icon, label) => (
    <NavLink to={to} style={({ isActive }) => (isActive ? activeLinkStyle : {})} className="sidebar-menu-item">
      <MenuItem icon={icon}>
        {collapsed ? '' : label}
      </MenuItem>
    </NavLink>
  );

  return (
    <Sidebar collapsed={collapsed} style={{ height: '100vh', overflowY: 'auto' }}>
      <Menu iconShape="square">
        <MenuItem icon={<FaList />} onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? 'Expand' : 'Collapse'}
        </MenuItem>
        {menuItem("/zones", <FaThLarge />, "Zones")}
        <MenuItem icon={<FaCalendarAlt />}>Calendar</MenuItem>
        {menuItem("/settings", <FaCog />, "Settings")}
      </Menu>
    </Sidebar>
  );
}

function App(){
  return (
  <BrowserRouter>
    <div className="App" style={{ display: 'flex', height: '100vh'  }}>
      <SidebarComponent />
      <main style={{ flex: 1, padding: '10px' }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/zones" element={<ZoneOverview />} />
          <Route path="/interface" element={<Interface />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/cap" element={<WaterCap />} />
          {/* Additional routes can be added here */}
        </Routes>
      </main>
    </div>
  </BrowserRouter>
);
}

export default App
