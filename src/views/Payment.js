import React,{useEffect,useState} from 'react'
import axios from 'axios';
import Searchbar from '../Utils/Searchbar';

import { HiCurrencyRupee } from 'react-icons/hi'
import ipAddress from '../config/IP';

const Payment = () => {


  const [payment,setpayment] = useState([]);

  const [updatePayStatus, setUpdatePayStatus] = useState({ updatePaymentStatus: '' })

  useEffect (() => {
    axios.get(`http://${ipAddress}:5000/payment`)
    .then((res) => {
      setpayment(res.data);
    })
  }, []);


  const updatePayment = async (registrationNo) => {
    try{
      const res = await axios.post(`http://${ipAddress}:5001/updateStatus`, {updatePayStatus, registrationNo})
      if (res.status === 200) 
      {
        alert('Status Updated! Please Refresh')
      }
    }catch(err)
    {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    setSearchPaymentData({...searchPaymentData, [e.target.name]:e.target.value});
  }

  const [searchPaymentData, setSearchPaymentData] = useState({ searchPayment: '' });

  const searchData = async () => {
    try {
      const res = await axios.post(`http://${ipAddress}:5001/search`, searchPaymentData)
      setpayment(res.data)
    } catch(err)
    {
      console.log(err)
    }
  }

  const clearSearch = async() => {
    try{
        const res = await axios.get(`http://${ipAddress}:5000/payment`)
        setpayment(res.data);
        setSearchPaymentData({ searchPayment: '' })
    }catch(err){
      console.log(err)
    }
  }

  return (
    <>
    <div className="heading-div">
      <p className="heading">< HiCurrencyRupee/> Pending Payment</p>
      <Searchbar
        placeholder = 'payment'
        name= 'searchPayment'
        onClick= { searchData }
        value= { searchPaymentData.searchPayment }
        onClickClear = { clearSearch }
        onChange = { handleChange }
      />
    </div>

    <div className="mainDivision">
      {payment.map((payment) => {
        return <div className="view" key={payment.payment_id}>
          <div className="view-card">
            
            <p className='plate'>{payment.registration_no}</p>

            <p>
              <span>Payment Status :&nbsp; </span> {payment.paymentStatus}
            </p>
           
            <p>
              <span>Amount :&nbsp; </span> {payment.amount}
            </p>
           
            <p>
              <span>Customer :&nbsp; </span> {payment.customer_name}
            </p>

            <p>
              <span>Contact :&nbsp; </span> {payment.contact}
            </p>

            <p>
              <span>Vehicle_model :&nbsp; </span> {payment.vehicle_model}
            </p>

            <div className="updateStatus">
              <span>Update Status :&nbsp; </span>
              <select name='updatePaymentStatus' value={updatePayStatus.updatePaymentStatus} onChange={(e) => setUpdatePayStatus(e.target.value)}>
                <option value="">select</option>
                <option value="2">Pending</option>
                <option value="1">Done</option>
              </select>
              <button onClick={() => updatePayment(payment.registration_no)}>Change</button>
            </div>

          </div>
        </div>
      })}
    </div>
    </>
  )
}

export default Payment
