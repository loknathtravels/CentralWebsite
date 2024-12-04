import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CardItem(props) {
    const [isHovered, setIsHovered] = useState(false)
    let myStyle ={
        padding: "10px",
        borderRadius:"20px",
        backgroundColor:isHovered?"rgb(0,0,20)":"rgb(0,0,50)",
        margin:"5px",
        boxShadow:isHovered?"16px 16px 32px black": "8px 8px 16px grey",
        transform: isHovered? "scale(1.03)":""
    }
    const imgStyle = {
        padding:"3px",
        margin:"3px",
        borderRadius:"50px",
        height:"30%",
        width:"80%"
    }

    const navigate = useNavigate();
    // console.log(item);
    const handleItinerary = (item) => {
        navigate('/itinerary', { state : item});
    };
    const handleMouseEnter = () =>{
        setIsHovered(true)
    }
    const handleMouseLeave = () =>{
        setIsHovered(false)
    }

    return (
        <div style={myStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='text-light'>
            <img className = "desc img" style={imgStyle} src= {props.item.ImageLocation}  alt='Location'/>
            <h5>{props.item.Name}</h5>
            <b>Date - {props.item.Date}</b>,
            <p><b>Tour Cost without Train or Air Fare - {props.item.Duration}</b></p>
            <p>{props.item.ShortDesc}</p>
            <button className='btn btn-sm btn-primary mb-2' onClick={() => handleItinerary(props.item)}>Read More</button>
        </div>
    );
}

export default CardItem;