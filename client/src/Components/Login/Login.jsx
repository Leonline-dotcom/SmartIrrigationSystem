import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <div>
      {/* <button>Register</button>
      <button>Sign In</button> */}

Not a User?<a href='/register'>Register!</a>
<br/>
To Dash<a href='/dashboard'>Dash</a>
    </div>
  )
}

export default Login