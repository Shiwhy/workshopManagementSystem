import React from 'react';
import '../css/about.css'
import aboutCar2 from '../images/aboutCar2.png';
// import mechanic from '../images/mechanic.png';
import team from '../images/About Section/team.jpg'

// ---- Icons ----
import { FaPeopleGroup } from "react-icons/fa6" //our Team heading
import Navbar from './Navbar';
// ---- x Icons x ----

export default function About() {

  return (
    <>
    <Navbar/>
    <div className='container' id='about'>
      <br />
      <h1 className='about-heading'>
        About Us 
      </h1>
      <br />
        <div className="content">
          <h4 className='team-heading'><FaPeopleGroup /> &nbsp; Our Team</h4>
          <br />
          <div className="row">
            <div className="col">
              <img src={ team } alt="/" className='mechanic'/>
            </div>
            <div className="col">
              <div className="about-text">
                <p className='all-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo rerum aut, perferendis quae facilis adipisci sunt voluptatibus nemo eveniet dolorum id doloribus dolor architecto nesciunt, pariatur a neque dolorem odit assumenda! Ea reiciendis repudiandae officiis perferendis sequi placeat accusantium sit ducimus hic sint quidem, quo velit corrupti? Itaque natus mollitia placeat laudantium nam dolor dolores eaque ex soluta deserunt.</p>
              </div>
              {/* <div>
                <p className='all-text'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sunt minima eaque nisi sed illo beatae aperiam optio quia eos, consectetur fugit harum ab delectus odit sint atque repudiandae officia aliquam possimus, sit nam. Magni laudantium animi et sequi illo quis recusandae maxime, voluptate doloribus, quibusdam dolore velit nihil! Optio atque rem maiores minus. Quo, officia rem maiores distinctio magni vero commodi nihil dicta ipsum tenetur excepturi natus blanditiis architecto tempora nam sunt vitae esse expedita id! Possimus quasi aperiam autem architecto deserunt. beatae similique, porro dolorem aliquid perferendis consequuntur soluta cupiditate eaque. Vero sint inventore quis voluptatibus aut voluptatem, dolorem aliquam aspernatur, quidem obcaecati nostrum quod sit est hic impedit rem accusantium repudiandae.</p>
              </div> */}
            </div>
          </div>

          <br />
          <hr />
          <br /><br />

          <h4 className='team-heading'><FaPeopleGroup /> &nbsp; Our Services</h4>
          <div className="row">
            <div className="col">
              <div className="about-text-2">
                <p className="all-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro numquam perspiciatis itaque temporibus maxime, dignissimos error reiciendis provident, molestias commodi iste possimus. Omnis repudiandae totam maiores natus tempore facilis quibusdam adipisci quos reiciendis beatae iure deserunt, amet voluptates officiis fugit soluta, iste at dolore nam repellat qui saepe. Accusamus ex nulla placeat impedit ratione deserunt voluptatibus repellat quisquam, minus inventore dolorem doloremque molestiae iusto ipsam fugiat neque molestias quasi rerum doloribus similique quaerat? Expedita culpa cumque error porro, adipisci amet quasi consequatur ab, ea rem nemo similique </p>
              </div>
            </div>
            <div className="col">
              <img src={ aboutCar2 } alt="/" className='aboutcar' />
            </div>
          </div>
        </div>
    </div>
    </>
  )
}
