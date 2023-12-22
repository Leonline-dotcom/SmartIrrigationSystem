import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'

//import icon
import { FaUserShield } from "react-icons/fa";
import { BsShieldLockFill } from "react-icons/bs";

// Import Assets
import video from '../../Assets/LoginAssets/Watering_Plant.mp4'
import logo from '../../Assets/LoginAssets/leaf_Logo.png'


const Login = () => {
  return (
    <div className='loginPage flex'>
    <div className="container flex">

      <div className="videoDiv">
        <video src={video} type="video/mp4" autoPlay muted loop></video>
        
        <div className="textDiv">
          {/* TODO: Make a Company Slogan*/}
          <h2 className='title'>Grow More With Less</h2>
          <p>Gardening in the modern Era</p>
        </div>

        <div className="footerDiv flex">
          <span className="text">Don't have an account?</span>
          <Link to={'/register'}>
          <button className='btn'>Sign Up</button>
          </Link>
        </div>
      </div>

      <div className="formDiv flex">
        <div className="headerDiv">
          <img src={logo} alt="sexy cool logo"/>
          <h3>Welcome Back!</h3>
        </div>

        <form action="" className='form grid'>
          <span>Login Status goes here</span>

          <div className="inputDiv">
            <label htmlFor="username">Username</label>
            <div className="input flex">
              <FaUserShield className ='icon'/>
              <input type="text" id='username' placeholder='Enter Username' />
            </div>
          </div>

          <div className="inputDiv">
            <label htmlFor="password">Password</label>
            <div className="input flex">
              <BsShieldLockFill className ='icon'/>
              <input type="password" id='password' placeholder='Enter Password' />
            </div>
          </div>
        </form>
      </div>    

    </div> 
    </div>
  )
}

export default Login