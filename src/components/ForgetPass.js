import React, { useState } from 'react';
import '../css/logSignForm.css';

import axios from 'axios';
import ipAddress from '../config/IP';

const ForgetPass = () => {

  const [forgotPassword, setForgotPassword] = useState({ forgUsername:'', forgPassword:'', confirmPassword:'' });

  const forgetPassword = async (e) => {
    e.preventDefault();

    var error = document.getElementById('error');

    if(!forgotPassword.forgUsername || !forgotPassword.forgPassword) {
      // alert("enter all fields");
      error.innerText = 'Enter all fields';
      error.style.display = 'block';
      setTimeout(()=> error.style.display = 'none', 3000);
    }
    else if(forgotPassword.forgPassword !== forgotPassword.confirmPassword) {
      // alert("enter same password");
      error.innerText = 'Both password is different';
      error.style.display = 'block';
      setTimeout(()=> error.style.display = 'none', 3000);
    } 
    else {
      try {
        const res = await axios.post(`http://${ipAddress}:5001/forgetPassword`, forgotPassword, {
          headers: { 'Content-Type': 'application/json' }
        });
  
        if (res.status === 200) {
          // alert("Password Changed.")
          error.innerText = 'Password Changed';
          error.style.color = 'green';
          error.style.display = 'block';
          setTimeout(()=> error.style.display = 'none', 3000);
          return;
        }
        
      } catch (err) {
          console.log(err)
      }
    }
  }

  const handleChange = (e) => {
    setForgotPassword({ ...forgotPassword, [e.target.name]:e.target.value });
  }

  return (

    <>
    <form className="container login-form" id='loginForm'>
      <h4>Forget Password</h4>
      <div className="inputBox">
        <input type="text" name='forgUsername' value={ forgotPassword.forgUsername } onChange={ handleChange } />
        <span>Username</span>
      </div>

      <div className="inputBox">
        <input type="password" name='forgPassword' value={ forgotPassword.forgPassword } onChange={ handleChange } />
        <span>New Password</span>
      </div>

      <div className="inputBox">
        <input type="password" name='confirmPassword' onChange={ handleChange } />
        <span>Confirm Password</span>
      </div>

      <p id="error"></p>

      <button className="savebtn" onClick={ forgetPassword }>Submit</button>
    </form>
    </>
  )
}

export default ForgetPass
