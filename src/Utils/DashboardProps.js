import React from 'react';
import { NavLink } from 'react-router-dom';


export default function DashboardProps(props) {

  


  return (
    <>
      <div className="col">
        <NavLink to={props.path}>
          <div className="card">
            <div className="dashboard-icon">
              <p>{props.icon}</p>
            </div>
            <div className="card-title">
              <p>{props.title}</p>
            </div>
            <div className="card-value">
              <p>{props.value}</p>
            </div>
          </div>
        </NavLink>
    </div>
    </>
  )
}
