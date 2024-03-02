import React,{ useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { MdEngineering } from "react-icons/md";
import Searchbar from '../Utils/Searchbar';
import ipAddress from '../config/IP';


const Employee = () => {

  const navigate = useNavigate();
  
  const  [emp, setEmp] = useState([])
  useEffect (() => {
    axios.get(`http://${ipAddress}:5000/employee`)
    .then((res) => {
      setEmp(res.data)
    });
  }, []);


  
  const [searchEmpData, setSearchEmpData] = useState({ searchEmp: '' })

  const handleChange = (e) => {
    setSearchEmpData({...searchEmpData, [e.target.name]:e.target.value});
  }

  const searchData = async() => {
    if(!searchEmpData.searchEmp) {
      alert('Enter field')
    }
    else{
      try {
        const res = await axios.post(`http://${ipAddress}:5001/search`, searchEmpData)
        setEmp(res.data)
      } catch(err)
      {
        console.log(err)
      }
    }
  }

  const clearSearch = async() => {
    try{
        const res = await axios.get(`http://${ipAddress}:5000/employee`)
        setEmp(res.data)
        setSearchEmpData({ searchEmp: '' })
    }catch(err){
      console.log(err)
    }
  }

  return (
    <>
    <div className="heading-div">
      <p className="heading"><MdEngineering/> Employee</p>

      <Searchbar
        placeholder='employee' 
        name='searchEmp' 
        value={ searchEmpData.searchEmp } 
        onChange={ handleChange } 
        onClick={ searchData } 
        onClickClear={ clearSearch }
      />

      <button className='addbtn' onClick={ () => navigate('/addemp') }> Add Employee</button>
    </div>

    
    <div className="mainDivision">

      {emp.map((employee) =>{
        return <div className="view" key={employee.emp_id}>
          <div className="view-card">
            <p className='plate'>
              {employee.designation}
            </p>
            <p>
              <span>Name :&nbsp; </span>{employee.emp_name}
            </p>
            <p>
              <span>Contact :&nbsp; </span>{employee.contact}
            </p>
            <p>
              <span>Address :&nbsp; </span>{employee.address}
            </p>
            <p>
              <span>Salary :&nbsp; </span>{employee.salary}
            </p>
            <p>
              <span>Email :&nbsp; </span>{employee.email}
            </p>
            <p>
              <span>Bank Account :&nbsp; </span>{employee.bank_acc}
            </p>
          </div>
        </div>
      })}
    </div>
    </>
  )
}

export default Employee
