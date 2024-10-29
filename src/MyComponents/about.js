import React, { useState } from 'react';
import '../CSS/about.css';
import image1 from "../Images/Services1.jpg"
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
      At Lokenath Caterer and Travels, we believe in creating unforgettable experiences for our guests. Our commitment goes beyond just providing a trip; we strive to offer a journey filled with small, meaningful services that enhance your overall travel experience.
      </p>
      <button className="toggle-button" onClick={handleToggle}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && (
        <div className="details-container">
          <h3>Culinary Delights:</h3>
          <p>
          Indulge your taste buds with our meticulously curated menu of super tasty local and international cuisines. Our chefs, passionate about creating culinary masterpieces, use the freshest ingredients to ensure each meal is a delight. From traditional dishes to gourmet treats, our dining experiences are designed to be a highlight of your journey.
          </p>
          <h3>Complete Hospitality:</h3>
          <p>
          hospitality is not just a service; it's a promise. Our dedicated team is committed to making you feel at home, even when you're miles away. From the moment you step into our care, we ensure your comfort and satisfaction. Whether it's assisting with travel arrangements, providing personalized recommendations, or attending to your specific needs, our hospitality extends beyond expectation.
          </p>
        </div>
      )}
    </div>
    <FooterComp />
    </>
  );
};

export default About;
