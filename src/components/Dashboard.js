import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom'
import '../css/dashboard.css';
import Navbar from '../components/Navbar'
import DashboardProps from '../Utils/DashboardProps';
// import axios from 'axios';



// ---- Icons ----
import { VscDashboard, VscFeedback } from 'react-icons/vsc';
import { IoCarSport } from 'react-icons/io5';
import { PiUsersThreeFill, PiClipboardTextFill } from 'react-icons/pi';
import { MdEngineering, MdPendingActions } from 'react-icons/md';
import { TbTruckDelivery, TbSettingsCog } from 'react-icons/tb';
import { HiCurrencyRupee } from 'react-icons/hi';
import ipAddress from '../config/IP';
// ---- x Icons x ----

export default function Dashboard() {

  // const [vehicleData, setVehicleData] = useState([])

  const [customer, setCustomer] = useState(0)
  const [emp, setEmp] = useState(0)
  const [vehicle, setVehicle] = useState(0)
  const [pendingWork,setPendingWork] = useState(0)
  const [pendingDelivery, setPendingDelivery] = useState(0)
  const [totalStock, setTotalStock] = useState(0)
  const [pendingPayment, setPendingPayment] = useState(0)
  const [feedbackCount, setFeedbackCount] = useState(0)
  const [jobcardCount, setJobcardCount] = useState(0)


  useEffect(() => {
    console.log(ipAddress);
    const fetchData = async () => {
      try{

        // vehicle
        let vehicle = await fetch(`http://${ipAddress}:5000/vehicle/count`)
        let vehicleData = await vehicle.json()
        let vehicleCount = vehicleData[0].count
        setVehicle(vehicleCount)

        // customer
        let customer = await fetch(`http://${ipAddress}:5000/customer/count`)
        let customerData = await customer.json()
        let customerCount = customerData[0].count
        setCustomer(customerCount)

        // employee
        let emp = await fetch(`http://${ipAddress}:5000/employee/count`)
        let empData = await emp.json()
        let empCount = empData[0].count
        setEmp(empCount)

        // pending work
        let pendingWork = await fetch(`http://${ipAddress}:5000/vehicle/pending/work`)
        let pendingWorkData = await pendingWork.json()
        let pendingWorkCount = pendingWorkData[0].pendingWork
        setPendingWork(pendingWorkCount)

        // pending delivery
        let pendingDelivery = await fetch(`http://${ipAddress}:5000/vehicle/pending/delivery/count`)
        let pendingDeliveryData = await pendingDelivery.json()
        let pendingDeliveryCount = pendingDeliveryData[0].pendingDelivery
        setPendingDelivery(pendingDeliveryCount)

        // total stock
        let totalStock = await fetch(`http://${ipAddress}:5000/parts/totalStock`) 
        let totalStockData = await totalStock.json()
        let totalStockCount = totalStockData[0].totalStock
        setTotalStock(totalStockCount)

        // payment
        let pendingPayment = await fetch(`http://${ipAddress}:5000/payment/pending`)
        let pendingPaymentData = await pendingPayment.json()
        let pendingPaymentCount = pendingPaymentData[0].pendingPayment
        setPendingPayment(pendingPaymentCount)

        // feedback
        let feedbackCount = await fetch(`http://${ipAddress}:5000/feedback/count`)
        let feedbackData =  await feedbackCount.json()
        let feedbackCounter = feedbackData[0].count
        setFeedbackCount(feedbackCounter)


        // jobcard
        let jobcardCount = await fetch(`http://${ipAddress}:5000/jobcard/count`)
        let jobcardCountData = await jobcardCount.json()
        let jobcardCounter = jobcardCountData[0].count
        setJobcardCount(jobcardCounter)

        // axios.get('http://${ipAddress}:5000/vehicle/count')
        // .then((res) => {
        //   console.log(res)
        //   setVehicleData(res.data)
        // });
        
      } catch(err){
        console.log('Error fetching data: ', err)
      }
    }
    fetchData()
  }, []);
  
  
  
  return (
    <>
    <Navbar/>
    <div className="container">
      <div className="dashboard">
        
        <br />

        <div className="row">
          <div className="col">
            <div className="dashboard-title">
              <h2><VscDashboard/> Dashboard</h2>
            </div>


            <div className="dashboard-slogan">
              <p>Driven by passion, <br /> Fueled by expertise.</p>
            </div>
          </div>

          <div className="col-8" id="dashboard">
            <div className="container">
              <div className="row">                               {/* ------------------------ First Row */}
                <div className="col">
                  <DashboardProps path='/vehicleview'  icon={<IoCarSport/>} title='Total Vehicles' value={ vehicle } />
                </div>
                <div className="col">
                  <DashboardProps  path='/usersview' icon={<PiUsersThreeFill/>} title='Total Customers' value={ customer }/> 
                </div>
                <div className="col">
                  <DashboardProps path='/empview' icon={<MdEngineering/>} title='Total Employees' value={ emp } />
                </div>
              </div>

                <br /><br />

              <div className="row">                               {/* ------------------------ Second Row */}
                <div className="col">
                  <DashboardProps path='/workview' icon={<MdPendingActions/>} title='Pending Work' value={ pendingWork } />
                </div>
                {/* <div className="col">
                  <DashboardProps icon={<MdBookOnline/>} title='Online Registrations' value='x'/>
                </div> */}
                <div className="col">
                  <DashboardProps path='/stockview' icon={<TbSettingsCog/>} title='Total Stocks' value={ totalStock } />
                </div>
                <div className="col">
                  <DashboardProps path='/deliveryview' icon={<TbTruckDelivery />} title='Pending Delivery' value={ pendingDelivery } />
                </div>
              </div>

                <br /><br />

              <div className="row">
                <div className="col">
                  <DashboardProps  path='/paymentview' icon={<HiCurrencyRupee/>} title='Remaining Payment' value={ pendingPayment } />
                </div>
                <div className="col">
                  <DashboardProps  path='/jobcardview' icon={<PiClipboardTextFill />} title='Jobcards' value={ jobcardCount } />
                </div>
                <div className="col">
                   <DashboardProps path='/feedbackview' icon={<VscFeedback/>} title='Feedbacks' value={ feedbackCount } /> 
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}


