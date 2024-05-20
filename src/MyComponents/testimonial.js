import React from 'react';
import '../CSS/testimonial.css';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


const Testimonial = ({ item }) => {

  const [dataToSend, setDataToSend] = useState(null);
    const navigate = useNavigate();

    const handleClick = () => (id) => {
        console.log(id);
        const fetchedData = {
            name: 'John Doe',
            age: 30
        };

        setDataToSend(fetchedData);

        navigate('/readTestimonial', { state: fetchedData });
    };
  return (
   
      <div className="testimonial" >
      <img src={item.imageUrl} alt={item.name} className="testimonial-image" />
      <p className="testimonial-text">"{item.text}"</p>
      <p className="testimonial-author">~ {item.name}</p>
      <button className="read-more" onClick={handleClick(item.id)}>Read More</button>
      </div>
  );
};

export default Testimonial;