import React, { useState } from 'react';
import '../CSS/about.css';
import image1 from "../Images/download.jpg"
import Navbar from './navbar';
import FooterComp from './footer';

const About = () => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggle = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
    <Navbar/>
    <div className="container about-us-container">
      <h2>About Us</h2>
      <img
            src={image1}
            alt="About Us"
            className="about-us-image"
          />
      <p>
        We are a dedicated team of professionals passionate about creating
        amazing products and providing exceptional services.
      </p>
      <button className="toggle-button" onClick={handleToggle}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && (
        <div className="details-container">
          <h3>Our Mission</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
            Nulla quis sem at nibh elementum imperdiet.
          </p>
          <h3>Our Vision</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
            Nulla quis sem at nibh elementum imperdiet.
          </p>
        </div>
      )}
    </div>
    <FooterComp />
    </>
  );
};

export default About;
