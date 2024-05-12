import React from 'react';
import '../CSS/testimonial.css';

const Testimonial = ({ name, text, imageUrl }) => {
  return (
   
      <div className="testimonial">

      <img src={imageUrl} alt={name} className="testimonial-image" />
      <p className="testimonial-text">"{text}"</p>
      <p className="testimonial-author">~ {name}</p> 
      </div>
  );
};

export default Testimonial;