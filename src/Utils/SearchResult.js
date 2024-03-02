import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdEngineering } from 'react-icons/md';
import Searchbar from '../Utils/Searchbar';

const Employee = () => {
  const navigate = useNavigate();

  const [emp, setEmp] = useState([]);
  const [searchPanelData, setSearchPanelData] = useState({ searchDataResult: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/employee').then((res) => {
      setEmp(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setSearchPanelData({ ...searchPanelData, [e.target.name]: e.target.value });
  };

  const searchData = async () => {
    try {
      const res = await axios.post('http://localhost:5001/search', searchPanelData);
      setEmp(res.data); // Update the state with search results
    } catch (err) {
      console.log(err);
    }
  };

  const clearSearch = async () => {
    try {
      const res = await axios.get('http://localhost:5000/employee');
      setEmp(res.data); 
      setSearchPanelData({ searchDataResult: '' });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="heading-div">
        <p className="heading">
          <MdEngineering /> Employee
        </p>
        <Searchbar
          placeholder="employee"
          name="searchData"
          value={searchPanelData.searchData}
          onChange={handleChange}
          onClick={searchData}
        />
        <button className="addbtn" onClick={() => navigate('/addemp')}>
          Add Employee
        </button>
        <button className="clearbtn" onClick={clearSearch}>
          Clear Search
        </button>
      </div>

      <div className="mainDivision">
        {emp.map((employee) => (
          <div className="view" key={employee.emp_id}>
            <div className="view-card">
              <p className="plate">{employee.designation}</p>
              <p>
                <span>Name :&nbsp; </span>
                {employee.emp_name}
              </p>
              <p>
                <span>Contact :&nbsp; </span>
                {employee.contact}
              </p>
              <p>
                <span>Address :&nbsp; </span>
                {employee.address}
              </p>
              <p>
                <span>Salary :&nbsp; </span>
                {employee.salary}
              </p>
              <p>
                <span>Email :&nbsp; </span>
                {employee.email}
              </p>
              <p>
                <span>Bank Account :&nbsp; </span>
                {employee.bank_acc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Employee;