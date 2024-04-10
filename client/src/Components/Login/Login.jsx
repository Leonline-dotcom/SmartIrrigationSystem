import React, {useEffect, useState, useContext} from 'react'
import './Login.scss'
import '../../App.scss'
import {Link, Navigate} from 'react-router-dom'

//import icon
import { FaUserShield } from "react-icons/fa";
import { BsShieldLockFill } from "react-icons/bs";
import { FaLongArrowAltRight } from "react-icons/fa";

// Import Assets
import video from '../../Assets/LoginAssets/plant.mp4'
import logo from '../../Assets/LoginAssets/leaf_Logo.png'
import { ApiUrlContext } from '../../App.jsx'

export default function Login() {
  const API_URL = useContext(ApiUrlContext);

  const [userData, setUserData] = useState(
    {username: "", password: "", found: false}
  )
  /*async function login(event){
    event.preventDefault();
    let username_val = document.getElementById("username").value;
    let password_val = document.getElementById("password").value;

    const login_data = {username: username_val, password: password_val};
    const fetch_options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(login_data)
    };
    const response = await fetch('http://localhost:5001/login', fetch_options);
    const response_body = await response.json();
    console.log(response_body)
    if(response.status !== 200){ 
      alert("Invalid login");
      return;
    }

    //Then navigate to the users individual page 
  }*/


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
     fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userData)
     }).then(
         res => res.json()
     ).then(
         data => {
           setUserData(prevUserData => {
               return {
                    ...prevUserData,
                    [userData.found]: data.found
               }
            })
           console.log(data)
         }
     )
     if (userData.found) {
         Navigate({to: '/Calendar'})
     }

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
                <p>Gardening in the Modern Era</p>
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
          {/* TODO We probably want to change "sexy cool logo" */}
          <h3>Welcome Back yall!</h3>
        </div>

              <form action="" className='form grid' onSubmit={handleSubmit}>

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

                <button className='btn flex' component={Link} to="/weather">
                  <span>Login</span>
                  <FaLongArrowAltRight className='icon'/>
                </button>

              </form>
            </div>

          </div>
        </div>
    )
  }
