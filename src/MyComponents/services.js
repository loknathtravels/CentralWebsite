import React from 'react';
import '../CSS/services.css'; // Import the CSS file for styling
import FooterComp from './footer'
import image1 from '../Images/Services1.jpg'
import image2 from '../Images/Services2.jpg'
const Services = () => {
  const servicesData = [
    {
      title: 'Tourism',
      description: 'Discover extraordinary journeys tailored just for you. Unforgettable adventures, personalized to perfection.',
      image: image1,
    },
    {
      title: 'Event Management',
      description: 'Savor the exceptional in every bite. Elevate your events with our culinary artistry, turning moments into memories.',
      image: image2,
    },
  ];

  return (
    <>
    <div className="container">
      <hr></hr>
      <h1>Our Services</h1>
      <div className="service-list">
        {servicesData.map((service, index) => (
          <div className="service" key={index}>
            <img src={service.image} alt={service.title} />
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
    <FooterComp/>
    </>
  );
};

export default Services;
