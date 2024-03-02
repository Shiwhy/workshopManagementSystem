import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Searchbar from '../Utils/Searchbar';
import { useNavigate } from 'react-router-dom';
import ipAddress from '../config/IP';

const InvoiceView = (props) => {

  const navigate = useNavigate()

  const [invoiceData, setInvoiceData] = useState([])


  useEffect(() => {
    axios.get(`http://${ipAddress}:5000/generatedInvoices`)
    .then((res) => {
      setInvoiceData(res.data);
    })
  }, []);

  const detailsInvoice = async (invoiceNo) => {
      navigate('/invoicedetailsview', {state: {id: invoiceNo}})
  }


  const [searchInvoice, setSearchInvoice] = useState({ searchInvoice: ''});

  const handleChange = (e) => {
    setSearchInvoice({...setSearchInvoice, [e.target.name]:e.target.value});
  }

  const searchJobcard =  async() => {
    try{
      const res = await axios.post(`http://${ipAddress}:5001/search`, searchInvoice)
      setInvoiceData(res.data)
    }catch(err){
      console.log(err)
    }
  }

  const clearSearch = async () => {
    try{
        const res = await axios.get(`http://${ipAddress}:5000/generatedInvoices`)
        setInvoiceData(res.data)
        setSearchInvoice({ searchJobcard: '' })
    }catch(err){
      console.log(err)
    }
  }
  
  return (
    <>
    <div className="heading-div">
      <p className="heading">Invoices</p>

      <Searchbar
        placeholder='Invoice' 
        name='searchInvoice' 
        value={ searchInvoice.searchJobcard } 
        onChange={ handleChange } 
        onClick={ searchJobcard } 
        onClickClear={ clearSearch }
      />

    </div>

    <div className="mainDivision">
      {invoiceData.map((invoice) => {
        return <div className="view" key={invoice.payment_id} >
          <div className="view-card">
            
            <p className='plate'>{invoice.registration_no}</p>

            <p>
              <span>Payment Status :&nbsp; </span> {invoice.paymentStatus}
            </p>
           
            <p>
              <span>Amount :&nbsp; </span> {invoice.amount}
            </p>
           
            <p>
              <span>Payment Date :&nbsp; </span> {invoice.payment_date}
            </p>

            <p>
              <span>Invoice Status :&nbsp; </span> {invoice.invoiceStatus}
            </p>

            <p>
              <span>Invoice no :&nbsp; </span> {invoice.invoice_no}
            </p>

            <p>
              <span>customer:</span> {invoice.customer_name}
            </p>


        
            <button className='savebtn' onClick={() => detailsInvoice(invoice.invoice_no)}>view invoice</button>


          </div>
        </div>
        
      })}
    </div>  
    </>

)
}



export default InvoiceView
