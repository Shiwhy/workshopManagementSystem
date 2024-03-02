import React,{useEffect,useState} from 'react'
import axios from 'axios';
import Searchbar from '../Utils/Searchbar';

import {MdPendingActions} from 'react-icons/md';
import ipAddress from '../config/IP';

const Work = () => {

  const [work, setwork] = useState([])
  const [updateWork, setUpdateWork] = useState({ updateWorkStatus: '' })

  useEffect (() => {
    axios.get(`http://${ipAddress}:5000/vehicle/pending/getwork`)
    .then((res) => {
      setwork(res.data);
    })
  }, []);

  const updateStatus = async (registrationNo) => {
    console.log(updateWork)
    try {
      const res = await axios.post(`http://${ipAddress}:5001/updateStatus`, {updateWork, registrationNo}, {
        headers:{ "Content-Type":"application/json" }
      })
      if(res.status=== 200)
      {
        alert('status updated! Please Refresh')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const [searchWorkData, setSearchWorkData] = useState({ searchPendingWork:'' })

  const handleChange = (e) => {
    setSearchWorkData({...searchWorkData, [e.target.name]:e.target.value});
  }

  const searchData = async () => {
    try {
      const res = await axios.post(`http://${ipAddress}:5001/search`, searchWorkData)
      setwork(res.data)
    } catch(err)
    {
      console.log(err)
    }
  }

  const clearSearch = async() => {
    try{
      const res = await axios.get(`http://${ipAddress}:5000/vehicle/pending/getwork`)
      setwork(res.data)
      setSearchWorkData({ searchPendingWork: '' })
  }catch(err){
    console.log(err)
  }
  }


  return (
    <>
    <div className="heading-div">
      <p className="heading"><MdPendingActions/>  Pending Work</p>

      <Searchbar
        placeholder = 'work'
        name= 'searchPendingWork'
        value= { searchWorkData.searchPendingWork }
        onClick= { searchData }
        onClickClear = { clearSearch }
        onChange = { handleChange }
      />
    </div>
    
    <div className="mainDivision">
      {work.map((pendingWork) => {
        return <div className='view' key={pendingWork.vehicle_id}>
          <div className="view-card">
            <p className='plate'>{pendingWork.registration_no}</p>
            <p>
              <span>Vehicle Type :&nbsp; </span>{pendingWork.vehicle_type}
            </p>
            <p>
              <span>Company :&nbsp; </span>{pendingWork.company_name}
            </p>
            <p>
              <span>Model :&nbsp; </span>{pendingWork.vehicle_model}
            </p>
            <p>
              <span>Fuel :&nbsp; </span>{pendingWork.fuel_name}
            </p>
            <p>
              <span>KMs :&nbsp; </span>{pendingWork.KMs}
            </p>
            <p>
              <span>Customer :&nbsp; </span>{pendingWork.customer_name}
            </p>
            <p>
              <span>Vehicle Status :&nbsp; </span>{pendingWork.value}
            </p>

            <div className="updateStatus">
              <span>Update Status :&nbsp; </span>
              <select name='updateWorkStatus' value={updateWork.updateWorkStatus} onChange={ (e) => setUpdateWork(e.target.value) }>
                <option value="">select</option>
                <option value="4">Pending</option>
                <option value="2">In-Work</option>
                <option value="1">Completed</option>
                 
              </select>
              <button onClick={() => updateStatus(pendingWork.registration_no)}>Change</button>
            </div>
          </div>
        </div>
      })}


    </div>
    </>
  )
}

export default Work

