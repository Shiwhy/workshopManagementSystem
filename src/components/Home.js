import React from 'react';
import '../css/home.css';
import '../css/footer.css';
import homeMechanic from '../images/Home Section/homeMechanic.jpg';
import homeMechanic2 from '../images/Home Section/homeMechanic2.jpg';

import Navbar from './Navbar';


// ---- Icons ----
import { BiSolidPhoneCall } from 'react-icons/bi';
import { IoIosMail } from 'react-icons/io';
import { MdLocationPin } from 'react-icons/md';
import { BiSolidTime } from 'react-icons/bi';
import { BiWindowClose } from "react-icons/bi";
import { IoCarSport } from "react-icons/io5";
import { GiMechanicGarage } from "react-icons/gi";
import { BsTools } from "react-icons/bs";
import { MdEngineering } from "react-icons/md";
import { RiOilFill } from "react-icons/ri"; 
import { FaBalanceScale } from "react-icons/fa";
import { SiGodotengine } from "react-icons/si"
// ---- x Icons x ----


export default function Home() {
  return (
    <>
    <Navbar/>
    
    <div className="container" id='home'>
      <div className="home-page">
        <div className="home-first-page">
          <h1 className='main-heading'>
            WELCOME<br /> TO THE <br /> GARAGE
          </h1>
        </div>
      </div>

      <br />

      <div className="home-second-page">
        <h1>WHO WE ARE?</h1>
      </div>
      <div className="first-image">
        <div className="row">
          <div className="col">
            <img src={ homeMechanic } alt="/" /*height={300}*/ className='homeMechanic' />
          </div>
          <div className="col">
            <p className="home-second-page-text">

              We are proud to introduce you to this Garage Management System, a dedicated team of automotive enthusiasts and technology experts. With a passion for two wheelers and four wheelers, a commitment to innovation, we embarked on a journey to simplify and enhance the garage management experience. 
              <br />
              Our mission is simple: to empower vehicle owners and garage operators with cutting-edge tools and resources that streamline operations and elevate customer satisfaction. Guided by core values of reliability, efficiency, and customer-centricity, we have diligently crafted a comprehensive solution that caters to the unique needs of both garages and their valued clients. Join us on this exciting ride as we revolutionize the way garages are managed, setting new standards of excellence in the automotive industry.
            </p>
          </div>
        </div>
      </div>

          <br />

      <div className="home-second-page">
        <h1>WHAT DO WE DO?</h1>
      </div>
      <div className="second-image">
        <div className="row">
          <div className="col">
            <img src={ homeMechanic2 } alt="/" height={300} className='homeMechanic2' />
          </div>
          <div className="col">
            <p className="home-second-page-text">
            We provide a glimpse into the multifaceted services and features offered by this Garage management system. At its core, our system is designed to streamline and optimize every aspect of garage management. We've harnessed the power of technology to simplify the daily operations of garages, whether you're a small, family-owned shop or a large, multi-location enterprise. Our user-friendly interface empowers garage owners and mechanics to focus on what they do best  providing top-notch automotive care  while we handle the administrative complexity. 
            <br />
            Additionally, our system offers a seamless experience for vehicle owners, allowing them to book appointments, receive real-time updates, and access detailed service histories, ensuring a problem-free and transparent interaction with their chosen garage.
            </p>
          </div>
        </div>
      </div>

        <br />

      <div className="home-second-page">
        <h1>Our Services</h1>
      </div>
      <br /><br />
      <div className="services">
        <div className="row">
          <div className="col">
            <div className="service-box">
              <GiMechanicGarage /> <br />
              <p className="service-title">Smart Repairing</p>   
            </div>
          </div>
          <div className="col">
            <div className="service-box">
              <BsTools /> <br />
              <p className="service-title">Excellent Work</p>
            </div>
          </div>
          <div className="col">
            <div className="service-box">
              <MdEngineering /> <br />
              <p className="service-title">Experienced Team</p>
            </div>
          </div>
        </div>
          
        <div className="row">
          <div className="col">
            <div className="service-box">
              <RiOilFill /> <br />
              <p className="service-title">All Types Of Oil</p>
            </div>
          </div>
          <div className="col">
            <div className="service-box">
              <FaBalanceScale /> <br />
              <p className="service-title">Tire Balancing</p>
            </div>
          </div>
          <div className="col">
            <div className="service-box">
              <SiGodotengine /> <br />
              <p className="service-title">Engine Issues</p>
            </div>
          </div>
        </div>
      </div>
      <br/>
    </div>

    <footer>
      <br/><br/>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="footer-logo">
              <span className='footer-logo-car'><IoCarSport /></span><span className='footer-logo-text'>GARAGE</span>
            </div>
          </div>
          <div className="col first-col">
            <h4 className='footer-heading'>CONTACT</h4>
            <div className="footer-text">
              <BiSolidPhoneCall /> &nbsp; +91 9876543210 <br />
              <IoIosMail />  &nbsp; workshop@gmail.com <br />
              <MdLocationPin /> &nbsp; 30, Auto workshop, Opp Havmor Restaurant, Navrangpura, Ahmedabad, Gujarat.
            </div>
          </div>
          <div className="col second-col">
            <h4 className='footer-heading'>BUSINESS HOUR</h4>
            <div className="footer-text">
              <BiSolidTime /> &nbsp; 24 hours open. <br />
              <BiWindowClose /> &nbsp; Closed on Sunday.
            </div>
          </div>
        </div>
      </div>
      <br />
    </footer>
    </>
  )
}
