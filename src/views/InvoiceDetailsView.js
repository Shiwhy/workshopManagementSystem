import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from '../components/Navbar'
import { useLocation } from 'react-router-dom';
import ipAddress from '../config/IP';



const InvoiceDetailsView = () => {

  const location = useLocation();
  const valueNo = location.state;
  const invoiceNo = Object.values(valueNo)

  const [invData, setInvData] = useState([])
  const [invSum, setInvSum] = useState([])


  useEffect(() => {
    axios.post(`http://${ipAddress}:5001/invoiceDetails`, invoiceNo)
    .then((res) => {
      setInvData(res.data)
    });

    axios.post(`http://${ipAddress}:5001/invoiceSummary`, invoiceNo)
    .then((res) => {
      setInvSum(res.data)
    })
  }, []);
    
    return (
    <>
      <div className="navbar">
        <Navbar/>
      </div>
    <div className="invDetails">

      {invSum.map((invSummary) => {
        return <div className="invSummaryDetails">

          <div className="row">
            <div className="col">
              <h6>Name: {invSummary.invoice_name}</h6>
            </div> 
            <div className="col">
              <h6>Plate No:  {invSummary.registration_no}</h6>
            </div>
             <br />

            <div className="col">
              <h6>Invoice Date: {invSummary.invoice_date}</h6>
            </div>
            {/* <div className="col">
              <h5>{invSummary.payment_date}</h5>
            </div> */}
          </div>

        </div>

      })}

      {/* <h3>Invoice</h3> */}
      <table className='invoiceDetailsTable'>
        <thead>
          <th>Parts/Services</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Amount</th>
        </thead>
          {invData.map((invData)  => {
            return <tbody key={invData.description_id}>
              <tr>
                <td>{invData.description}</td>
                <td>{invData.quantity}</td>
                <td>{invData.unit_price}</td>
                <td>{invData.amount}</td>
                {/* <td>{invData.total}</td> */}
              </tr>
            </tbody>
          })}
          
          <tfoot>
            {invSum.map((invSummary) => {
              return <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>Total: {invSummary.amount}</td>
              </tr>
            })}
            {/* <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>colspan</td>
            </tr> */}
          </tfoot>
          {/* {invSum.map((invTotal) => {
            return <div>{invTotal.amount}</div>
          })} */}
      </table>
    </div>

    </>
  )
}

export default InvoiceDetailsView;
