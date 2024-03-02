import React from 'react'
import '../css/addparts.css'

const AddParts = () => {
  return (
    <>
    <div id="parts">
      {/* <div className="head">
        <h3>Add Parts</h3>
      </div> */}

      <div className="form-p">
        <div className="main-parts">
          <center>
            <h3>Add Part</h3> 
          </center>  

          <table id='addpartstable'>
              
              <tr>
                <th>Part : </th>
                <td>
                  <input type="text" 
                  />
                </td>
              </tr>

              <tr>
                <th>price : </th>
                <td>
                  <input type="number" />
                </td>
              </tr>

              <tr>
                <th>Units : </th>
                <td>
                  <input type="number" />
                </td>
              </tr>

          </table>
        </div>

      </div>

    </div>
    </>
  )
}

export default AddParts
