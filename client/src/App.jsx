import './App.scss'
import Dashboard from './Components/Dasboard/Dashboard'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'

// Enable Routing!
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'
import React from "react";


//create router

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
    path:'/dashboard',
    element: <div><Dashboard/></div>
  }

])


function App() {
  /*const [userData, setUserData] = useState(
      {username: "", password: "", email: ""}
  )*/

  /*useEffect(() => {
    fetch("/signUp").then(
        res => res.json()
    ).then(
        data => {
          setUserData(data)
          console.log(data)
        }
    )
  }, [])*/

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
