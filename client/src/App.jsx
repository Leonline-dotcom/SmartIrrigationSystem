import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink} from 'react-router-dom'
import { Sidebar, Menu, MenuItem,} from 'react-pro-sidebar';
import { FaList, FaThLarge, FaCog, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './App.scss'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import ZoneOverview from './Components/Zones/ZoneOverview'
import Interface from './Components/HardwareTesting/Interface';
import Settings from './Components/Settings/Settings'
import WaterCap from './Components/TankCapacity/WaterCap'
import Weather from  './Components/Weather Display/Weather'



function NavLinkMenuItem({ to, icon, label, collapsed }) {
  const navigate = useNavigate();
  
  // Handler to navigate to the `to` path
  const handleNavigate = () => {
    navigate(to);
  };
  
  return (
    <div onClick={handleNavigate} className={`sidebar-menu-link ${collapsed ? 'collapsed' : ''}`}>
      <MenuItem className={`menu-item ${collapsed ? 'collapsed' : ''}`}>
        <div className="icon">{icon}</div>
        {!collapsed && <span className="label">{label}</span>}
      </MenuItem>
    </div>
  );
}

function SidebarComponent(){
  const [collapsed, setCollapsed] = useState(false);

  // Define a custom menu item that incorporates NavLink for routing
  const activeLinkStyle = {
    backgroundColor: 'var(--sidebarActiveColor)', // Adjust as needed
  };

  // Avoid wrapping MenuItem with NavLink directly to prevent HTML validation issues
  // const NavLinkMenuItem = ({ to, icon, label }) => (
  //   <NavLink to={to} style={({ isActive }) => (isActive ? activeLinkStyle : undefined)} className="sidebar-menu-link" end>
  //     <MenuItem className={`menu-item ${collapsed ? 'collapsed' : ''}`}>
  //       <div className="icon">{icon}</div>
  //       {!collapsed && <span className="label">{label}</span>}
  //     </MenuItem>
  //   </NavLink>
  // );

  return (
    <Sidebar collapsed={collapsed} style={{ height: '100vh', overflowY: 'auto' }}>
      <Menu iconShape="square">
        <MenuItem onClick={() => setCollapsed(!collapsed)} className="menu-item">
            <div className="icon"><FaList /></div>
            {!collapsed && <span className="label">Collapse</span>}
        </MenuItem>
        <NavLinkMenuItem to="/zones" icon={<FaThLarge />} label="Zones" collapsed={collapsed}/>
        <NavLinkMenuItem to="/settings" icon={<FaCog />} label="Settings" collapsed={collapsed}/>
        <NavLinkMenuItem to="/calendar" icon={<FaCalendarAlt />} label="Calendar" collapsed={collapsed}/>
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
          {/* Additional routes can be added here */}
        </Routes>
      </main>
    </div>
  </BrowserRouter>
);
}

export default App
