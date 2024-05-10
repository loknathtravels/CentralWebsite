import React from 'react';
import Navbar from './navbar';
import Testimonial from './testimonial';

const TestimonialsList = ({ testimonials }) => {
  return (
    <>
    <Navbar/>
    <div className="testimonials-list">
      {testimonials.map(testimonial => (
        <Testimonial
          key={testimonial.id}
          name={testimonial.name}
          text={testimonial.text}
          imageUrl={testimonial.imageUrl}
        />
      ))}
    </div>
    </>
  );
};

export default TestimonialsList;
