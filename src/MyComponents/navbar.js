import React from 'react';
import '../CSS/Navbar.css'
import nav_img from "../Images/nav-img.png"
import { NavLink } from 'react-router-dom';
import { FaHome, FaAdn, FaServicestack, FaRegImages } from 'react-icons/fa'
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <a href="/" className="navbar__logo"><img src={nav_img} alt="nav"/></a>
        <ul className="navbar__menu">
          <li className="navbar__item"><NavLink to='/' className="navbar__link"><FaHome className='custom-icon'/>Home</NavLink></li>
          <li className="navbar__item"><NavLink to="/about" className="navbar__link"><FaAdn className='custom-icon'/>
          About</NavLink></li>
          <li className="navbar__item"><NavLink to="/testimonials" className="navbar__link"><FaServicestack className='custom-icon'/>Testimonials</NavLink></li>
          <li className="navbar__item"><NavLink to="/gallery" className="navbar__link"><FaRegImages className='custom-icon'/>Gallery</NavLink></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
