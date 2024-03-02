import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Searchbar from '../Utils/Searchbar';

import {PiClipboardTextFill} from 'react-icons/pi';
import ipAddress from '../config/IP';


const Jobcarddetails = () => {

  const [jobcard,setjobcard] = useState([])

  useEffect (() => {
    axios.get(`http://${ipAddress}:5000/jobcard`)
    .then((res) => {
      setjobcard(res.data);
    })
  },[]);

  const [searchJobcardData, setSearchJobcardData] = useState({ searchJobcard: ''});

  const handleChange = (e) => {
    setSearchJobcardData({...searchJobcardData, [e.target.name]:e.target.value});
  }

  const searchJobcard =  async() => {
    try{
      const res = await axios.post(`http://${ipAddress}:5001/search`, searchJobcardData)
      setjobcard(res.data)
    }catch(err){
      console.log(err)
    }
  }

  const clearSearch = async () => {
    try{
        const res = await axios.get(`http://${ipAddress}:5000/jobcard`)
        setjobcard(res.data)
        setSearchJobcardData({ searchJobcard: '' })
    }catch(err){
      console.log(err)
    }
  }

  const [updateJobcardStatus, setUpdateJobcardStatus] = useState({ jobcardStatus:'' });
  

  const updateJobcard = async(registrationNo) => {
    try{
      const res = await axios.post(`http://${ipAddress}:5001/updateStatus`, {updateJobcardStatus, registrationNo})
      if(res.status===200){
        alert('Status updated! Please refresh')
      }
    }catch(err)
    {
      console.log(err)
    }

  }


  return (
    <>
    <div className="heading-div">
      <p className="heading">< PiClipboardTextFill/> Jobcard</p>

      <Searchbar
        placeholder='Jobcard' 
        name='searchJobcard' 
        value={ searchJobcardData.searchJobcard } 
        onChange={ handleChange } 
        onClick={ searchJobcard } 
        onClickClear={ clearSearch }
      />

    </div>
    <div className="mainDivision">
      {jobcard.map((jobcard) => {
        return <div className="view" key={jobcard.jobcard_id}>
          <div className="view-card" >
            <p className="plate">{jobcard.registration_no}</p>
            <p>
              <span>Jobcard Date :&nbsp; </span> {jobcard.jobcard_date}
            </p>
            <p>
              <span>Jobcard status :&nbsp; </span> {jobcard.jobcardStatus}
            </p>
            <p>
              <span>Customer :&nbsp; </span> {jobcard.customer_name}
            </p>
            <p>
              <span>Employee :&nbsp; </span> {jobcard.emp_name}
            </p>
            <p>
              <span>Vehicle Model :&nbsp; </span> {jobcard.vehicle_model}
            </p>
            <p>
              <span>Complain :&nbsp; </span> {jobcard.complain}
            </p>
            {/* <p>
              <span>Part :&nbsp; </span> {jobcard.part_name}
            </p> */}
            <p>
              <span>Payment Status:&nbsp; </span> {jobcard.paymentStatus}
            </p>
            <p>
              <span>Invoice name :&nbsp; </span> {jobcard.invoice_name}
            </p>
            <p>
              <span>Estimate :&nbsp; </span> {jobcard.est_date}
            </p>

            <div className="updateStatus">
              <span>Update Status :&nbsp; </span>
              <select name='updateJobcardStatus' value={updateJobcardStatus.jobcardStatus} onChange={(e) => setUpdateJobcardStatus(e.target.value)}>
                <option value="">select</option>
                <option value="2">InComplete</option>
                <option value="1">Complete</option>
              </select>
              <button onClick={() => updateJobcard(jobcard.registration_no) }>Change</button>
            </div>
          </div>
        </div>
      })}
      </div>
    </>
  )
}

export default Jobcarddetails
