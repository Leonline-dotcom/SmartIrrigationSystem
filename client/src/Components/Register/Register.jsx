import React from 'react'
import './Register.css'
import '../../App.css'
import { Link } from 'react-router-dom'

//import icons
import { MdEmail } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import { BsShieldLockFill } from "react-icons/bs";
import { FaLongArrowAltRight } from "react-icons/fa";

// Import Assets
import video from '../../Assets/LoginAssets/plant.mp4'
import logo from '../../Assets/LoginAssets/leaf_Logo.png'

// const API_URL = "http://localhost:5001";  //Local Host URL
const API_URL = "http://oasis-flow.com";      //Website URL



export default function Register() {
  const [userData, setUserData] = React.useState(
      {username: "", password: "", email: ""}
  )
  function handleChange(event){
    setUserData(prevUserData => {
      return {
        ...prevUserData,
        [event.target.name]: event.target.value
      }
    })
  }

  function handleSubmit(event){
    event.preventDefault()
    console.log(userData)
    // API data submission goes here
    fetch(`${API_URL}/api/register`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userData)
     }).then(
         res => res.json()
     ).then(
         data => {
           //setUserData(data)
           console.log(data)
         }
     )
  }

  return (
    <div className='registerPage flex'>
    <div className="container flex">

       {/* Below is the code for the Video and the register button  */}
      <div className="videoDiv">
        <video src={video} type="video/mp4" autoPlay muted loop></video>
        
        <div className="textDiv">
          {/* TODO: Make a Company Slogan*/}
          <h2 className='title'>Grow More With Less</h2>
          <p>Gardening in the modern Era</p>
        </div>

        <div className="footerDiv flex">
          <span className="text">Have an account?</span>
          <Link to={'/login'}>
          <button className='btn'>Log In!</button>
          </Link>
        </div>
      </div>
      {/* Here is the code for the form */}
      <div className="formDiv flex">
        <div className="headerDiv">
          <img src={logo} alt="sexy cool logo"/>
          <h3>Tell Us about Yourself!</h3>
        </div>

        <form action="" className='form grid' onSubmit={handleSubmit}>
          {/* <span className='showMessage'>Register Status goes here</span> */}

          <div className="inputDiv">
            <label htmlFor="email">Email</label>
            <div className="input flex">
              <MdEmail className ='icon'/>
              <input type="email"
                     id='email'
                     placeholder='Enter Email'
                     onChange={handleChange}
                     name="email"
                     value={userData.email}
              />
            </div>
          </div>
          
          
          <div className="inputDiv">
            <label htmlFor="username">Username</label>
            <div className="input flex">
              <FaUserShield className ='icon'/>
              <input type="text"
                     id='username'
                     placeholder='Enter Username'
                     onChange={handleChange}
                     name="username"
                     value={userData.username}
              />
            </div>
          </div>

          <div className="inputDiv">
            <label htmlFor="password">Password</label>
            <div className="input flex">
              <BsShieldLockFill className ='icon'/>
              <input type="password"
                     id='password'
                     placeholder='Enter Password'
                     onChange={handleChange}
                     name="password"
                     value={userData.password}
              />
            </div>
          </div>
          <button className='btn flex'>
            <span>Register</span>
            <FaLongArrowAltRight className='icon' />
          </button>

        </form>
      </div>    

    </div> 
    </div>
  )
}
