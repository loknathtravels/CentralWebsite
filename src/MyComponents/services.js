import React from 'react';
import '../CSS/services.css'; // Import the CSS file for styling
import FooterComp from './footer'
import image1 from '../Images/download.jpg'
const Services = () => {
  const servicesData = [
    {
      title: 'Service 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: image1,
    },
    {
      title: 'Service 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: image1,
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
