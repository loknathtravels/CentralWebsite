import React from 'react';
import Navbar from './navbar';
import Testimonial from './testimonial';
import { useState, useEffect } from 'react';

const TestimonialsList = () => {

  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      full_text: "something...........................",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/loknathcatererandtravels.appspot.com/o/download-card.jpeg?alt=media&token=cfd1052f-d62c-47bf-a740-214f803b4cd4"
    },
    {
      id: 2,
      name: "Jane Smith",
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      full_text: "something...........................",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/loknathcatererandtravels.appspot.com/o/download-card.jpeg?alt=media&token=cfd1052f-d62c-47bf-a740-214f803b4cd4"
    },
  ];

  // const openPage = (id) => {
  //   for(let i in testimonials){
  //     if(testimonials[i].id === id){
  //       console.log(id)
  //     }
  //   }
  //   // navigate('/detail', { state: { item } });
  // };

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
        {chunkArray(testimonials,isMobile).map((rowItem, rowIndex)=>(
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
