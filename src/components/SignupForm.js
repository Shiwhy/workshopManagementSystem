import React, { useState } from 'react'
import '../css/logSignForm.css'
import { NavLink } from 'react-router-dom'
import ipAddress from '../config/IP'

export default function LoginForm() {

  const userSignupData = {
    name : "",
    username : "",
    password : "",
    email : "",
  }

  const [signupData, setsignupData] = useState(userSignupData)

  const handleChange =(e) => {
    setsignupData({...signupData, [e.target.name]:e.target.value})
  }

  
  const handleSubmit = async(e) => {
    var error = document.getElementById('error')

    e.preventDefault();

    if (!signupData.username || !signupData.name || !signupData.password || !signupData.email) {
      // alert("Please fill out all fields")
      error.style.display = 'block';
      return;
    } else if (!signupData.email.includes('@') || !signupData.email.includes('.')) {
      // alert('Please enter valid email')
      error.innerText = 'Please enter valid email';
      error.style.display = 'block';
      return;
    }
    
    const response = await fetch(`http://${ipAddress}:5001/signup`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });
    const authUserPass = await response.json()
    if(response.ok) {
      // alert('signup succesfull')
      error.style.color = 'green';
      error.innerText = 'Signup Succesfull';
      error.style.display = 'block';
      return;
    }else if(response.status === 400){
      // alert('user already exist ')
      error.style.color = '';
      error.innerText = 'User Already Exist ';
      error.style.display = 'block';
    } else{
      alert('signup fail');
      console.log(authUserPass.error)
    }
  }

  return (
    <>
    <form className="container signup-form" id='signUp'>
      <h1>SignUp</h1>
      <div className="inputBox">
        <input 
          type="text" 
          name='name' 
          value={signupData.name} 
          onChange={handleChange}
          />
        <span>Your Name</span>
      </div>
      <div className="inputBox">
        <input type="text"  name='username' value={signupData.username} onChange={handleChange}/>
        <span>Username</span>
      </div>
      <div className="inputBox">
        <input type="email" 
          name='email' 
          value={signupData.email}
          onChange={handleChange}
        />
        <span>Email</span>
      </div>
      <div className="inputBox">
        <input type="password" name='password' value={signupData.password} onChange={handleChange}/>
        <span>Password</span>
      </div>
 
      <span id="error">All fields are required</span>
 
      <button className='signupBtn' onClick={ handleSubmit }>Sign Up</button>

      <p>Already have an account? <NavLink to='/login'>Login here</NavLink></p>
    </form>
    </>
  )
}