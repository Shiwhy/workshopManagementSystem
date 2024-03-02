import React from 'react';
import '../css/Landing.css';

import logoText from '../images/logoText.png';
import logoCar from '../images/logoCar.png';

import { NavLink } from 'react-router-dom';
import {AiOutlineUser} from 'react-icons/ai';
import { BiUserPlus } from 'react-icons/bi';

const Landing = () => {

  return (
    <>
    {/* <div className="page"> */}
      <div className="landing-main">

        <div className="landing-cover-page">
          <div className="landing-logoCar">
            <img src={logoCar} alt="/" />
          </div>

          <div className="landing-logoText">
            <img src={logoText} alt="/" />
          </div>
        </div>


        <div className="landing-links">
          <NavLink to='/login'> <AiOutlineUser/> Login </NavLink>
          <NavLink to='/signup'> <BiUserPlus/> Signup</NavLink>
        </div>

      </div>
    {/* </div> */}
    </>
  )
}

export default Landing
