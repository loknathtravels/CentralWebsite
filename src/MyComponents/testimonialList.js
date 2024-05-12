import React from 'react';
import Navbar from './navbar';
import Testimonial from './testimonial';
import { useState, useEffect } from 'react';

const TestimonialsList = ({ testimonials }) => {
  const [isMobile, setIsMobile] = useState(2)
  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    return chunks;
  };
  var my_style ={
    margin:'2% 2% 0% 6%'
  }

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
    <div className="testimonials-list">
    <h3>Testimonials</h3>
        {chunkArray(testimonials,isMobile).map((rowItem, rowIndex)=>(
     <div key={rowIndex} className="row">
      {rowItem.map((item, index)=>(
            <div style = {my_style} key={index} className="col">
        <Testimonial
          key={item.id}
          name={item.name}
          text={item.text}
          imageUrl={item.imageUrl}
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
