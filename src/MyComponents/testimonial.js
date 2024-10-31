import React from 'react';
import '../CSS/testimonial.css';
import { useNavigate } from 'react-router-dom';


const Testimonial = ({ item }) => {

    const navigate = useNavigate();
    // console.log(item);
    const handleClick = (id) => {
        console.log(item);
        navigate('/readTestimonial', { state : item});
    };
  return (
   
      <div className='testimonial-container'>
          <img src={item.ImageUrl} alt={item.name} className="testimonial-image img-fluid" />
          <div className="testimonial" >
            <p className="testimonial-text">"{item.Text}..."</p>
            <p className="testimonial-author">~ {item.Name}</p>
            <p className="testimonial-author">~ {item.CorrespondingTour}</p>
          <button className="read-more" onClick={() => handleClick(item.id)}>Read More</button>
        </div>
      </div>
  );
};

export default Testimonial;