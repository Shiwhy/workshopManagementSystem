import React, { useState } from 'react';
import axios from 'axios';
import '../css/jobcard.css'
import { BsCreditCard2Front } from 'react-icons/bs'
import { BiSave } from 'react-icons/bi'
import Navbar from './Navbar';
import ipAddress from '../config/IP';


export default function Jobcard() {
  
  const jobcardDetails = {
    name: '', address: '', contact: '', email: '', custStatus:'',     // customer
    vehType: '', fuel: '', company: '', model: '', plate: '', kms: '', vehicleStatus: '', serviceDate: '',    // vehicle
    empid: '', empName: '', empContact: '',     // employee
    complains: '', reqService: '', compStatus: '',      // complain
    paymentStatus: '', payDate:'',     // payment
    parts: '',      //parts
    jobcardStatus: '' //jobcrd
  }
  const [jobcardData, setJobcardData] = useState(jobcardDetails)
  
  const handleChange = (e) => {
    setJobcardData({ ...jobcardData, [e.target.name]:e.target.value });
  }

  
  const addJobcardData = async () => {
    let fillInput = document.getElementById('fillInput');
    let emailError = document.getElementById('emailError');

    if (Object.values(jobcardData).some((value) => value === '')) {
      fillInput.innerText = 'Please fill all the fields';
      fillInput.style.display='block';

      setTimeout(() => {
        fillInput.style.display= 'none';
      }, 5000);
      // alert("fill all fields")
      return;
    }
    else if (!jobcardData.email.includes('@') || !jobcardData.email.includes('.')) {
      emailError.innerText = 'Email Must includes "@" and "."';
      emailError.style.display = 'block'
      // setTimeout(() => {
      //   emailError.style.display = 'none'
      // }, 3000)
    } 
    else if (jobcardData.contact.length < 10 || jobcardData.contact.length > 10) {
      fillInput.innerText = 'Please enter 10 digit contact number';
      fillInput.style.display = 'block';
      setTimeout (() => {
        fillInput.style.display = 'none';
      }, 5000);
    } 
    else if(jobcardData.plate.includes(' ') || jobcardData.plate.includes('  ')) {
      alert('no space allowed in number plate')
    }
    else {
      try{

        const response = await axios.post(`http://${ipAddress}:5001/jobcard`, jobcardData, {
          headers:{
            "Content-Type": "application/json"
          }
        });

        if(response.status === 200){
          fillInput.style.color = 'green'
          fillInput.innerText = 'Data Added Successfully';
          fillInput.style.display = 'block'
          setTimeout(() => {
            fillInput.style.display = 'none'
          }, 5000);
          return;

        } else{
          fillInput.innerText = 'Data Adding failed';

          fillInput.style.display = 'block'
          
        }

      }catch(err){
        console.log(err)
      }
    }

  }

  const getEmpData = async () => {
      try {
        const response = await axios.post(`http://${ipAddress}:5001/jobcard/employee`, jobcardData, {
          headers: {
            "Content-Type": "application/json"
          }
        });

        
        const { empName, empContact } = response.data;
        setJobcardData({
          ...jobcardData,
          empName: empName,
          empContact: empContact,
        });
        // console.log(response.status)
        if (response.status === 200) {
          alert("Employee fetched")
        } else {
          console.log(response.status)
        }
        
      } catch (err) {
        // alert('employee not exist')
        alert("Employee not exist")
        console.log(err)
      }
  }

  return (
    <>
    <Navbar/>

    <div className="container jobcard">
      <h1 className='jobcard-title'><BsCreditCard2Front/> JobCard</h1> 

      <div className="jobcard-details">
        <h5>Customer Details</h5> <hr />
        <div className="input-box">
          <div className="row">
            <div className="col">
              <span>Name :</span> 
              <input 
                type="text"
                name='name'
                value={jobcardData.name}
                onChange={handleChange} 
              /> 

              <span>Contact :</span> 
              <input 
                type="number" 
                placeholder='only numbers'
                name='contact'
                value={jobcardData.contact}
                onChange={handleChange}
              />

              <span>Email :</span> 
              <input 
                type="text" 
                name='email'
                value={jobcardData.email}
                onChange={handleChange}
              />
              {/* validation */}
              <p id="emailError"></p>
            </div>

            <div className="col">
              <span>Address :</span> 
              <textarea cols="30" rows="5"
                name="address"
                value={jobcardData.address}
                onChange={handleChange}
              ></textarea>

              <span>Status: </span>
              <select name="custStatus" onChange={handleChange} value={jobcardData.custStatus}>
                <option value="">Select Type</option>
                <option value="1">Active</option>
                <option value="2">Not-Active</option>
              </select>
            </div>

            {/* <div className="col">
              <span>Jobcard Create Date: </span>
              <input type="date"
                name='jobcardDate'
              />
            </div> */}
          </div>
        </div>

      
        <h5>Vehicle Details</h5> <hr />
        <div className="input-box">
          <div className="row">
            <div className="col">

              <span>Vehicle Type :</span> 
                <select name='vehType' onChange={handleChange} value={jobcardData.vehType}> 
                  <option value="">Select Type</option>
                  <option value="Four Wheel">Four Wheel</option>
                  <option value="Two Wheel">Two Wheel</option>
                  <option value="Three Wheel">Three Wheel</option>
                </select>

              <span>Fuel :</span>
                <select name='fuel' onChange={handleChange} value={jobcardData.fuel}>
                  <option value="">Select Fuel</option>
                  <option value="1">Petrol</option>
                  <option value="2">Diesel</option>
                  <option value="3">CNG</option>
                  <option value="4">EV</option>
                </select>

              <span>Vehicle Company: </span> 
                <select name='company' onChange={handleChange} value={jobcardData.company}>
                  <option value="">Select Company</option>
                  <option value="1">Tata</option>
                  <option value="2">Hyundai</option>
                  <option value="3">Toyota</option>
                  <option value="4">Mercedes</option>
                  <option value="5">Audi</option>
                </select>
            </div>
            <div className="col">
              <span>Model :</span> 
              <input 
                type="text" 
                onChange={handleChange}
                name='model'
                value={jobcardData.model}
              />

              <span>Number Plate :</span> 
              <input 
                type="text" 
                onChange={handleChange}
                name='plate'
                value={jobcardData.plate}
              />

              <span>KmS Travelled :</span> <span className="thumbnail"></span>
              <input 
                type="number" 
                placeholder='only numbers'
                onChange={handleChange}
                name='kms'
                value={jobcardData.kms}
              />

            </div>

            <div className="col">
            <h6>Vehicle status</h6>
            <span>Current :</span>
              <select name='vehicleStatus' value={jobcardData.vehicleStatus} onChange={handleChange}>
                <option value="">Select Status</option>
                <option value="1">Complete</option>
                <option value="2">In-Work</option>
                <option value="3">Delivered</option>
                <option value="4">Pending</option>
              </select>
              
            <span>Estimated Completion Date :</span> 
            <input 
              type="date" 
              name='serviceDate'
              value={jobcardData.serviceDate}
              onChange={handleChange}
            /> 
            </div>
          </div>
        </div>

          <h5>Complains</h5> <hr />
          <div className="input-box">
            <div className="row">
              <div className="col">
                <span>Complains :</span> 
                <textarea cols="70" rows="10"
                  className='complain-box'
                  name='complains'
                  value={jobcardData.complains}
                  onChange={handleChange}
                ></textarea>
                
              </div>
              <div className="col">
                <span>Requested Service :</span> 
                <textarea cols="70" rows="10"
                  className='complain-box'
                  name='reqService'
                  value={jobcardData.reqService}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="col-2">
                Status: <br />
                <select name="compStatus" onChange={handleChange} value={jobcardData.compStatus}>
                  <option value="">Select Status</option>
                  <option value="2">Pending</option>
                  <option value="1">Done</option>
                </select>
              </div>
            </div>
          </div>

          <h5>Other</h5> <hr />
          <div className="input-box">
            <div className="row">
              <div className="col">
                <h6>Employee Assigned </h6>
                <span>ID :</span> 
                <input 
                  type="number" 
                  className='empid'
                  placeholder='ID number'
                  name='empid'
                  value={jobcardData.empid}
                  onChange={handleChange}
                />
                <button className='empdetail' onClick={getEmpData}>Get</button>

                <span>Name :</span> 
                <input readOnly
                  type="text" 
                  name='empName'
                  value={jobcardData.empName}
                  onChange={handleChange}
                />

                <span>Contact :</span> 
                <input readOnly
                  type="text"
                  name='empContact' 
                  value={jobcardData.empContact}
                  onChange={handleChange}
                />

              </div>

              <div className="col">
                <h6>Parts Required</h6>
                <textarea cols="30" rows="8" 
                  name='parts' 
                  value={jobcardData.parts} 
                  onChange={handleChange}>
                </textarea>
              </div>

              <div className="col">
                <h6>Payment</h6>

                {/* <span>Method :</span>
                  <select id='pymentDD' name='paymentMethod' value={jobcardData.paymentMethod} onChange={handleChange}>
                    <option value="">Select Method</option>
                    <option value="Cash">Cash</option>
                    <option value="Cheque">Cheque</option>
                  </select> */}

                <span>Payment Date :</span> 
                  <input 
                    type="date" 
                    name='payDate'
                    value={jobcardData.payDate}
                    onChange={handleChange}
                  />
{/* 
                <span>Amount :</span> 
                  <input 
                    type="number" 
                    name='amount'
                    placeholder='only numbers'
                    value={jobcardData.amount}
                    onChange={handleChange}
                  /> */}
                  
                <span>Status :</span> 
                  <select name='paymentStatus' value={jobcardData.paymentStatus} onChange={handleChange}>
                    <option value="">Select status</option>
                    <option value="1">Done</option>
                    <option value="2">Pending</option>
                  </select>
              </div>
            </div>
          </div>
          <button onClick={addJobcardData} className='savebtn'><BiSave/> Save</button>
          <p id="fillInput"></p>

          <div className="jobcard-status">
            <span>Jobcard Status : &nbsp;</span>
              <select name="jobcardStatus" value={jobcardData.jobcardStatus} onChange={handleChange}>
                <option value="">Select status</option>
                <option value="1">Complete</option>
                <option value="2">Incomplete</option>
              </select>
          </div>
      </div>
      <br /><br />
    </div>
    </>
  )
}
