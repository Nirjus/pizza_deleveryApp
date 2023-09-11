import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
         <Link to={"/logIn"}><button>Log In</button></Link>
            <Link to={"/signUp"}><button>Sign Up</button></Link>
    </div>
  )
}

export default Login