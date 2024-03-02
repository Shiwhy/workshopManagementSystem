import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Searchbar from '../Utils/Searchbar';

import { IoCarSportSharp } from "react-icons/io5";
import ipAddress from '../config/IP';


const Vehicle = () => {

  const [vehicle,setVehicle] = useState([])

  useEffect(() => {
    axios.get(`http://${ipAddress}:5000/vehicle`)
    .then((res) => {
      setVehicle(res.data)
    })
  }, []);


  const [searchVehicleData, setSearchVehicleData] = useState({ searchVehicle: '' })

  const handleChange = (e) => {
    setSearchVehicleData({...searchVehicleData, [e.target.name]:e.target.value});
  }

  const searchData = async () => {
    if(!searchVehicleData.searchVehicle) {
      alert('Enter field')
    }
    else{
      try {
        const res = await axios.post(`http://${ipAddress}:5001/search`, searchVehicleData)
        setVehicle(res.data)
      } catch(err)
      {
        console.log(err)
      }
    }
  }
  

  const clearSearch = async() => {
    try{
        const res = await axios.get(`http://${ipAddress}:5000/vehicle`)
        setVehicle(res.data)
        setSearchVehicleData({ searchVehicle:'' })
    }catch(err){
      console.log(err)
    }

  }


  return (
    <>
      <div className="heading-div">
        <p className="heading"><IoCarSportSharp/> Vehicle</p>

          <Searchbar
            placeholder='vehicle' 
            name='searchVehicle' 
            value={ searchVehicleData.searchVehicle } 
            onChange={ handleChange } 
            onClick={ searchData } 
            onClickClear={ clearSearch }
          />
        
      </div>
    <div className="mainDivision">

      {vehicle.map((vehicle) => {

        return <div className="view" key={vehicle.vehicle_id}> 
          <div className="view-card">
            <p className='plate'>{vehicle.registration_no}</p>
            <p><span>Type: </span> {vehicle.vehicle_type}</p>
            <p><span>company: </span> {vehicle.company_name}</p>
            <p><span>Model: </span> {vehicle.vehicle_model}</p>
            <p><span>fuel: </span> {vehicle.fuel_name}</p>
            <p><span>KM: </span> {vehicle.KMs}</p>
            <p><span>Customer: </span> {vehicle.customer_name}</p>
            <p><span>Vehicle Status: </span> {vehicle.value}</p>
          </div>
        </div>

        // return <div className="view" key={vehicle.vehicle_id}>
        //   <div className="view-card">
        //     <p className="plate">{vehicle.registration_no}</p>
        //   </div>
        // </div>

      })}
    </div>
    </>
  )
}

export default Vehicle
