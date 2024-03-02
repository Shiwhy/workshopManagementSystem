import React,{useEffect,useState} from 'react'
import axios from 'axios'
import '../css/views_css/addstock.css';
import Searchbar from '../Utils/Searchbar';

// import Searchbar from '../Utils/Searchbar';
// import { FiPlus } from "react-icons/fi";

import { TbSettingsCog } from 'react-icons/tb'
import { AiFillPlusSquare } from "react-icons/ai";
import ipAddress from '../config/IP';

const Stock = () => {

  const [stock,setstock] = useState([]) 

  useEffect (() => {
    axios.get(`http://${ipAddress}:5000/parts`)
    .then((res) => {
      setstock(res.data);
    })
  },[]);

  const part = {
    partname : '',
    partprice : '',
    partunit : '',

  }
  const [partData, setPartData] = useState(part)

  const [showInput, setShowInput] = useState({});
  const handleUnitInput = (partId, partName) => {
    setShowInput((prev) => ({  [partId]: !prev[partId] }));
  };

  const showMenu = () => {
    var addpart = document.getElementById('addpartView');
    var btntext = document.getElementById('addpartmenuBtn')
    if (addpart.style.display === 'none')
    {
      addpart.style.display = 'block';
      btntext.innerHTML = 'Close Menu'
    }else{
      addpart.style.display = 'none';
      btntext.innerHTML = 'Add New Part';
    }
  }

  const addPart = async () => {
    try{
      await axios.post(`http://${ipAddress}:5001/addpart`, partData,{
        headers:{ 
          "Content-Type":"application/json"
        }
      });
    }catch(err){
        console.log(err)
      }
    }
    // const partName = stock.find((part_Name) => {return part_Name.part_name})
    // console.log(partName)

    const [searchPartData, setSeacrhPartData] = useState({ searchPart:'' })

  
  const [addUnit, setAddUnit] = useState('')
  
  const handleAddUnit = async (partName) => {
    try {
      const res = await axios.post(`http://${ipAddress}:5001/addPartUnit`, { addUnit, partName });
      if(res.status === 200)
      {
        alert('Part Added! Please Refresh');
      }
    }catch(err)
    {
      console.log(err)
    }
  }
  
  const handleChange = (e) => {
    setPartData({...partData,[e.target.name]:e.target.value});
    setSeacrhPartData({ ...searchPartData, [e.target.name]:e.target.value })
  }

  const searchData = async() => {
    try {
      const res = await axios.post(`http://${ipAddress}:5001/search`, searchPartData)
      setstock(res.data)
    } catch(err)
    {
      console.log(err)
    }
  }

  const clearSearch = async() => {
    try{
        const res = await axios.get(`http://${ipAddress}:5000/parts`)
        setstock(res.data)
        searchPartData({ searchPart: '' })
    }catch(err){
      console.log(err)
    }

  }

  
  return (
    <>
    <div className="heading-div">
      <p className="heading"><TbSettingsCog/> Stock</p>

      <Searchbar
        placeholder = 'stock'
        name= 'searchPart'
        onClick = { searchData }
        onChange = { handleChange }
        onClickClear= { clearSearch }
      />

      <button id='addpartmenuBtn' onClick={showMenu}>Add New Part</button>
    </div>

    <div id="addpartView">

      <table id="addpartTable">
        <tr>
          <th>Part: </th>
          <td>
            <input type="text" name='partname' value={partData.partname} onChange={handleChange}/>
          </td>
        </tr>
        <tr>
          <th>Price: </th>
          <td>
            <input type="number" placeholder='only number' name='partprice' value={partData.partprice} onChange={handleChange}/>
          </td>
        </tr>
        <tr>
          <th>Unit: </th>
          <td>
            <input type="number"  placeholder='only number' name='partunit' value={partData.partunit} onChange={handleChange}/>
          </td>
        </tr>
      </table>

      <div className="partbtn">
        <button className='addpartbtn' onClick={ addPart }>Add</button> 
        <p id='error'></p>

      </div>
    </div>


    <div className="mainDivision">
      {stock.map((parts) => {
        return <div className="view" key={parts.part_id}>

          <div className="view-card">
            <p>
              <span>Part :&nbsp; </span> <span id='partName'>{parts.part_name}</span>
            </p>
            <p>
              <span>Price :&nbsp; </span>{parts.price}
            </p>
            <p>
              <span>Units :&nbsp; </span>{parts.units}

              <div className="unitbtn-input">
                <button className="unitbtn" onClick={ () => handleUnitInput(parts.part_id) }><AiFillPlusSquare/></button>

                {/* <div className="unitinput" id={`unitinput_${parts.part_id}`}>
                  <input type="text" />
                  <button className='unitbtnPlus'>ADD</button>
                </div> */}

                {showInput[parts.part_id] && (
                  <div className="unitinput" id={`unitinput_${parts.part_id}`}>
                    <input type="number" name='addunit' value={ addUnit } onChange={ (e) => setAddUnit(e.target.value) } />
                    <button className="unitbtnPlus" onClick={ () => handleAddUnit(parts.part_name) }>ADD</button>
                  </div>
                )}

              </div>



            </p>
          </div>
        </div>
      })}
    </div>
    </>
  )
}

export default Stock;
