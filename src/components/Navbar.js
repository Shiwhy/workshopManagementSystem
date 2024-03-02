import React from 'react';
import '../css/navbar.css'
import logoText from '../images/logoText.png';
import logoCar from '../images/logoCar.png';
import { NavLink } from 'react-router-dom';

// ---- Icons ----
import { BiHomeAlt2 } from "react-icons/bi" //Home
import { VscDashboard } from "react-icons/vsc"; //Dashboard
import { BsCreditCard2Front } from "react-icons/bs"; //Jobcard
import { LiaFileInvoiceDollarSolid } from "react-icons/lia" //invoice

// ----x Icons x ----


export default function Navbar() {

  return (
    <>
    <header>
      <div className="logo">
        <img src={logoCar} alt="/" />
      </div>
      <div className="logo-text">
        <img src={logoText} alt="/" />
      </div>
      <nav>
        <div className="navbar">
          <ul>
            <li><NavLink to="/home"> <BiHomeAlt2 /> Home</NavLink></li>
            <li><NavLink to='/dashboard'> <VscDashboard /> Dashboard</NavLink></li> 
            <li><NavLink to='/jobcard'> <BsCreditCard2Front /> Jobcard</NavLink></li>
            <li><NavLink to='/invoice'> <LiaFileInvoiceDollarSolid /> Invoice</NavLink></li>
          </ul>
        </div>
      </nav>
    </header>
    </>
  )
}