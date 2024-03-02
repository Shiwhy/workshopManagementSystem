import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Searchbar from '../Utils/Searchbar';

// Icon
import { HiUsers } from "react-icons/hi";
import ipAddress from '../config/IP';

const Users = () => {
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    axios.get(`http://${ipAddress}:5000/customer`)
    .then((res) => {
      setUsers(res.data)
    })
  }, [])


  const [searchCutomerData, setSearchCustomerData] = useState({ searchCustomer: '' })

  const handleChange = (e) => {
    setSearchCustomerData({...searchCutomerData, [e.target.name]:e.target.value});
  }

  const searchData = async () => {
    if(!searchCutomerData.searchCustomer) {
      alert('Enter field')
    }
    else{
      try {
        const res = await axios.post(`http://${ipAddress}:5001/search`, searchCutomerData)
        setUsers(res.data);
      } catch(err)
      {
        console.log(err)
      }
    }
  }

  

  const clearSearch = async () => {
    try{
        const res = await axios.get(`http://${ipAddress}:5000/customer`)
        setUsers(res.data)
        setSearchCustomerData({ searchCustomer: '' })
    }catch(err){
      console.log(err)
    }
  }

  return (
    <>
     <div className="heading-div">
        <p className="heading"><HiUsers/> Customers</p>

        <Searchbar
          placeholder='customer' 
          name='searchCustomer' 
          value={ searchCutomerData.searchCustomer } 
          onChange={ handleChange } 
          onClick={ searchData } 
          onClickClear={ clearSearch }
        />


      </div>
    <div className="mainDivision">

    {users.map((customer) => {
      return <div className="view" key={customer.customer_id}>
          <div className="view-card" >
            <p className="plate">{customer.registration_no}</p>
            <p>
              <span>Name :&nbsp; </span> {customer.customer_name}
            </p>
            <p>
              <span>Contact :&nbsp;</span> {customer.contact}
            </p>
            <p>
              <span>Address :&nbsp; </span> {customer.Address}
            </p>
            <p>
              <span>Email :&nbsp; </span> {customer.email}
            </p>
            <p>
              <span>Vehicle :&nbsp;</span> {customer.vehicle_model}
            </p>
            <p>
              <span>Status :&nbsp;</span> {customer.customerStatus}
            </p>
          </div>
       </div>
    })}
    </div>
    </>
  )
}

export default Users
