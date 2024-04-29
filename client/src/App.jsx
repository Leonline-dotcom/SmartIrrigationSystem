import React, { useState, useEffect ,createContext } from 'react';
import { BrowserRouter, Routes, Route, NavLink} from 'react-router-dom'
import { Sidebar, Menu, MenuItem,} from 'react-pro-sidebar';
import { FaList, FaThLarge, FaCog, FaCalendarAlt, FaCloudSun } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './App.scss'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import ZoneOverview from './Components/Zones/ZoneOverview'
import Interface from './Components/HardwareTesting/Interface';
import Settings from './Components/Settings/Settings'
import Weather from  './Components/Weather Display/Weather'
import CalendarPage from './Components/Scheduler/Calendar';

// Create a context for API_URL
export const ApiUrlContext = createContext();

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


  const activeLinkStyle = {
    backgroundColor: 'var(--sidebarActiveColor)', 
  };

  useEffect(() => {
    const sidebarWidth = collapsed ? '80px' : '250px'; 
    document.documentElement.style.setProperty('--sidebarWidthExpanded', sidebarWidth);
  }, [collapsed]);

  return (
    <Sidebar collapsed={collapsed} style={{ height: '100vh', overflowY: 'auto' }}>
      <Menu iconShape="square">
        <MenuItem onClick={() => setCollapsed(!collapsed)} className="menu-item">
            <div className="icon"><FaList /></div>
            {!collapsed && <span className="label">Collapse</span>}
        </MenuItem>
        <NavLinkMenuItem to="/zones" icon={<FaThLarge />} label="Zones" collapsed={collapsed}/>
        <NavLinkMenuItem to="/calendar" icon={<FaCalendarAlt />} label="Calendar" collapsed={collapsed}/>
        <NavLinkMenuItem to="/weather" icon={<FaCloudSun />} label="Weather" collapsed={collapsed}/>
        <NavLinkMenuItem to="/settings" icon={<FaCog />} label="Settings" collapsed={collapsed}/>
      </Menu>
    </Sidebar>
  );
}


function App(){
  const apiUrl = "http://10.159.64.185:5001";  //Local Host URL
  // const apiUrl = "http://oasis-flow.com";      //Website URL

  return (
    <BrowserRouter>
    <ApiUrlContext.Provider value={apiUrl}>
      <div className="App" style={{ display: 'flex', height: '100vh' }}>
        <SidebarComponent />
        <main style={{ flex: 1, padding: '10px' }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/zones" element={<ZoneOverview />} />
            <Route path="/interface" element={<Interface />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/calendar" element={<CalendarPage />} />
            {/* Additional routes can be added here */}
          </Routes>
        </main>
      </div>
    </ApiUrlContext.Provider>
  </BrowserRouter>
);
}

export default App
