import React from 'react';
import '../CSS/testimonial-blog.css';
import Navbar from './navbar';
import { useLocation } from 'react-router-dom';

const Testimonial = () => {


  const location = useLocation();
  console.log(location.state);
    
  return (
    <div className="full-page">
        <Navbar/>
    <div className="testimonial-container-blog">
    <div className="testimonial-header-blog">
        <h1>What Our Fellow Travelers Say</h1>
    </div>
    <div className="testimonial-content-blog">
        <img src={location.state.ImageUrl} alt="Author" className="author-image" />
          <p className="testimonial-text-blog">
              "{location.state.Full_text}"
          </p>
        <p className="author-name-blog">~{location.state.Name}</p>
        <p className="testimonial-author">{location.state.CorrespondingTour}</p>
    </div>
  </div>
</div>
  );
};

export default Testimonial;