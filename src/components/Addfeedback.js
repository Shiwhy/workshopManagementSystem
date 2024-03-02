import React, { useState } from 'react';
import '../css/adfeedback.css';

import axios from 'axios';
import ipAddress from '../config/IP';

const Addfeedback = () => {

  const [customerEmail, setCustomerEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  const addFeedback = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://${ipAddress}:5001/addfeedback`, { customerEmail, feedback });
      if(res.status === 200) {
        alert('feedback added');
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
    <div id="addFeedback">
      <div className="head-dt">
        <h3>Add Feedback </h3>
      </div>
      <div className="feedbackform">
        <div className="custDetails">
          <span>Customer Email: </span> &nbsp;
          <input type="text" name='customerEmail' value={ customerEmail } onChange={ (e) => setCustomerEmail(e.target.value) } />
        </div>
        <textarea cols="60" rows="10" name='feedback' value={ feedback } onChange={ (e) => setFeedback(e.target.value) } ></textarea>
        <button className="savebtn" onClick={ addFeedback }>Add</button>
      </div>
    </div>
    </>
  )
}

export default Addfeedback
