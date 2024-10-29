import React from 'react';
import Navbar from './navbar';
import Testimonial from './testimonial';
import { useState, useEffect } from 'react';

const TestimonialsList = (testimonials) => {

  const [isMobile, setIsMobile] = useState(2)
  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    return chunks;
  };
  const handleResize = () => {
    if (window.innerWidth < 770) {
        setIsMobile(1)
    } else {
        setIsMobile(3)
    }
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  }) 
  return (
    <>
    <Navbar/>
    <div className="testimonials-list container">
    <h3>Testimonials</h3>
        {chunkArray(testimonials.testimonials,isMobile).map((rowItem, rowIndex)=>(
     <div key={rowIndex} className="row">
      {rowItem.map((item, index)=>(
            <div key={index} className="col mb-3">
        <Testimonial
          item={item}
        />
      </div>
      ))};
      </div>
    ))};
  </div>
    </>
  );
};

export default TestimonialsList;
