import React from 'react';
import '../css/addEmp.css'

import {MdEngineering} from 'react-icons/md'

const AddEmp = () => {
  return (
    <>
    <div id="addemp">

        <div className="center">
          <p><MdEngineering/> Employee</p>
        </div>
      <div className="empbg">


        <div className="emp-form">
          <div className="emp-d">
            <span>Details</span>
          </div>
          
        <div className="emp-designation">
            <span>Designation : </span> &nbsp;
            <input type="text" />
        </div>

          <div className="row">
            <div className="col">
              <div className="emp-input">
                <span>Name : </span>
                <input type="text" />
              </div>

              <div className="emp-input">
                <span>Email : </span>
                <input type="text" />
              </div>

              <div className="emp-input">
                <span>Contact : </span>
                <input type="number" />
              </div>
            </div>

            <div className="col">
              <div className="emp-input">
                <span>Address : </span> <br />
                <textarea  cols="25" rows="5"></textarea>
              </div>
            </div>

            <div className="col">
              <div className="emp-input">
                <span>Bankacc : </span>
                <input type="number" />

                <div className="emp-input">
                  <span>Salary : </span>
                  <input type="number" />
                </div>

              </div>
            </div>
          </div>

          <div className="emp-designation">
            <button className='savebtn'>Add</button>
          </div>
         
        </div>

      </div>
   
    </div> 
    </>
  )
}

export default AddEmp
