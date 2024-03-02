import React, { useState } from 'react' 
import '../css/addemptable.css'
import axios from 'axios';

import { MdPersonAddAlt1 } from "react-icons/md";
import ipAddress from '../config/IP';

const AddEmp = () => {

  const e_data = {
    e_name: '', e_email: '', e_contact: '', e_address: '', e_salary: '',
    e_bank_acc: '', e_designation: ''
  }

  const [empData, setEmpData] = useState(e_data)

  const handleChange = (e) => {
    setEmpData ({ ...empData, [e.target.name]:e.target.value })
  }

  const addEmpData = async () => {
    let error = document.getElementById('error');

    if (Object.values(empData).some((value) => value === '')) {
      error.innerText = '! Please Enter All Fields';
      error.style.color = 'red'
      error.style.display = 'block';
      setTimeout(() => {
        error.style.display = 'none';
      }, 5000)
    }
    else if (!empData.e_email.includes('@') || !empData.e_email.includes('.')) {
      error.innerText = 'Enter Valid Email';
      error.style.display = 'block';
      setTimeout(() => {
        error.style.display = 'none';
      }, 5000);
    } 
    else if (empData.e_contact.length < 10 || empData.e_contact.length > 10) {
      error.innerText = 'Please enter 10 digit contact number';
      error.style.display = 'block';
      setTimeout (() => {
        error.style.display = 'none';
      }, 5000);
    } 
    else {
      try{
        // var error = document.getElementById('error')
        const res = await axios.post(`http://${ipAddress}:5001/addemp`, empData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if(res.status === 200)
        {
          // alert('Data added')
          error.innerText = 'Employee Added succesfully !!';
          error.style.color = 'green';
          error.style.display = 'block';
          setTimeout (() => {
            error.style.display = 'none';
          }, 5000)
        }

      } catch(err) {
        console.log(err)
      }
    }


  }

  return (
    <>
    <div id="empl">
      <div className="head-dt">
        <h3><MdPersonAddAlt1/> Add Employee</h3>
      </div>

      <div className="add-emp-table">
        <center>
          <h3>Details</h3>
        </center>

        <table id='addemptable'>
          <div className="table-left">
            <tr>
              <th>Name : </th>
              <td>
                <input 
                  type='text' 
                  name='e_name' 
                  value={empData.e_name}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <th>Email :</th>
              <td>
                <input 
                  type="email" 
                  name='e_email'
                  value={empData.e_email}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <th>Contact :</th>
              <td>
                <input 
                  type="number" 
                  name='e_contact'
                  value={empData.e_contact}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </div>

          <div className="table-center">
            <tr>
              <th>Address :</th>
            </tr>

            <tr>
              <td>
                <textarea cols="25" rows="5" 
                  name='e_address'
                  value={empData.e_address}
                  onChange={handleChange}
                ></textarea>
              </td>
            </tr>
          </div>

          <div className="table-right">
            <tr>
              <th>Salary :</th>
              <td>
                <input 
                  type="number"
                  name='e_salary'
                  value={empData.e_salary}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <th>Bank_acc : </th>
              <td>
                <input 
                  type="number" 
                  name='e_bank_acc'
                  value={empData.e_bank_acc}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <th>Designation : </th>
              <td>
                <input 
                  type="text" 
                  name='e_designation'
                  value={empData.e_designation}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </div>
        </table>

        <center>
          <button className='savebtn' onClick={addEmpData}>Add employee</button>
          <p id='error'></p>
        </center>

      </div>   
    </div>
    </>
  )
}

export default AddEmp;

