import React, {useEffect, useState} from 'react'
import './Login.css'
import '../../App.css'
import { Link } from 'react-router-dom'

//import icon
import { FaUserShield } from "react-icons/fa";
import { BsShieldLockFill } from "react-icons/bs";
import { FaLongArrowAltRight } from "react-icons/fa";

// Import Assets
import video from '../../Assets/LoginAssets/Watering_Plant.mp4'
import logo from '../../Assets/LoginAssets/leaf_Logo.png'


export default function Login() {
  const [userData, setUserData] = useState(
      {username: "", password: "", found: false}
  )

  function handleChange(event) {
    setUserData(prevUserData => {
      return {
        ...prevUserData,
        [event.target.name]: event.target.value
      }
    })
  }

  /*useEffect(() => {
    fetch("http://localhost:5000/login", {
    method: 'POST'
    }).then(
        res => res.json()
    ).then(
        data => {
          setUserData(data)
          console.log(data)
        }
    )
  }, [])*/

  function handleSubmit(event) {
    event.preventDefault()
    console.log(userData)
    // API data submission goes here
    fetch("http://localhost:5000/login", {
    method: 'POST',
      body: userData,
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
        <div className='loginPage flex'>
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
                <span className="text">Don't have an account?</span>
                <Link to={'/register'}>
                  <button className='btn'>Sign Up</button>
                </Link>
              </div>
            </div>
            {/* Here is the code for the form */}
            <div className="formDiv flex">
              <div className="headerDiv">
                <img src={logo} alt="sexy cool logo"/>
                <h3>Welcome Back!</h3>
              </div>

              <form action="" className='form grid' onSubmit={handleSubmit}>
                <span className='showMessage'>Login Status goes here</span>

                <div className="inputDiv">
                  <label htmlFor="username">Username</label>
                  <div className="input flex">
                    <FaUserShield className='icon'/>
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
                    <BsShieldLockFill className='icon'/>
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
                  <span>Login</span>
                  <FaLongArrowAltRight className='icon'/>
                </button>

                <span className="forgotPassword">
            Forgot your password? <a href="">Click Here</a>
          </span>

              </form>
            </div>

          </div>
        </div>
    )
  }
