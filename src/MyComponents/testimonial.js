import React from 'react';
import '../CSS/testimonial.css';
import { useNavigate } from 'react-router-dom';


const Testimonial = ({ item }) => {

    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate('/readTestimonial', { state: id });
    };
  return (
   
      <div className='testimonial-container'>
          <img src={item.imageUrl} alt={item.name} className="testimonial-image img-fluid" />
          <div className="testimonial" >
            <p className="testimonial-text">"{item.text}"</p>
            <p className="testimonial-author">~ {item.name}</p>
          <button className="read-more" onClick={() => handleClick(item.id)}>Read More</button>
        </div>
      </div>
  );
};

export default Testimonial;