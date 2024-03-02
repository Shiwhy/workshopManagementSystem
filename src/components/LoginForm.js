import React, { useState } from 'react';
import '../css/logSignForm.css'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

import { LuSmilePlus } from "react-icons/lu";
import ipAddress from '../config/IP';



export default function LoginForm() {

  const navigate = useNavigate();
  
  const userLoginData = { username: '', password: '' };
  const [loginData, setLoginData] = useState(userLoginData)

  const handleData = (e) => {
    setLoginData({...loginData, [e.target.name]:e.target.value})
  }

  const handleLogin =  async (e) => {
    e.preventDefault();
    var error = document.getElementById('error')
    

    if(!loginData.username || !loginData.password) {
        error.style.display = 'block';
    } else {
      try{
        const res = await axios.post(`http://${ipAddress}:5001/login`, loginData, {
          headers:{
            'Content-Type': 'application/json'
          }
        });

        if(res.status===200) {
          navigate('/home')
        } else {
          alert('login failed')
        }
      } catch(err) {
        // alert('Invalid Username or Password')

        if(error.style.display === 'none') {
          error.style.display = 'block';
        }else{
          error.style.display = 'block';
        }
        console.error(err)
      }
    }
  }

  return (
    <>
    <form className="container login-form" id='loginForm'>
      <h1>Login</h1>
      <div className="inputBox">
        <input type="text" id='username' name='username' value={ loginData.username } onChange={ handleData } required="required" />
        <span>Username</span>
      </div>
      <div className="inputBox">
        <input type="password" id='password' name='password' value={ loginData.password } onChange={ handleData } required="required" />
        <span>Password</span>
      </div>

      <p id='error'>Invalid Username or Password</p>

      <button className='loginBtn' type='submit' onClick={ handleLogin } >Log In</button>
      <NavLink to='/forgetpassword'>Forgot Password?</NavLink>

      
      <p>Don't have an account?  <NavLink to="/signup" className='signup-link'>SignUp here</NavLink></p>

      <span className='note'> <LuSmilePlus/> Signup First</span>

    </form>
    </>
  )
}