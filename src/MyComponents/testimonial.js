import React from 'react';
import '../CSS/testimonial.css';

const Testimonial = ({ name, text, imageUrl }) => {
  return (
    <div className="container">
      <div className="testimonial-block">
      <div className="testimonial">
      <span>
      <img src={imageUrl} alt={name} className="testimonial-image" />
      <p className="testimonial-text">"{text}"</p>
      <p className="testimonial-author">~ {name}</p> 
      </span>
      </div>
      </div>
    </div>
  );
};

export default Testimonial;