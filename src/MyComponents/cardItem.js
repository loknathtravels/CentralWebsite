import React from 'react';
import { useState } from 'react';

function CardItem(props) {
    const [expanded, setExpanded] = useState(true)
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
    const handleMouseEnter = () =>{
        setIsHovered(true)
    }
    const handleMouseLeave = () =>{
        setIsHovered(false)
    }
    const handleReadMore = () =>{
        if (expanded === true){
            setExpanded(false)}
        else{
            setExpanded(true)
        }

    }

    return (
        <div style={myStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='text-light'>
            <img className = "desc img" style={imgStyle} src= {props.item.ImageLocation}  alt='Location'/>
            <h5>{props.item.Name}</h5>
            <b>Date - {props.item.Date}</b>,
            <p><b>Tour Cost without Train or Air Fare - {props.item.Duration}</b></p>
            {expanded ?(<>
            <p>{props.item.ShortDesc}</p>
            <button className='btn btn-sm btn-primary mb-2' onClick={handleReadMore}>Read More</button></>):
            (<><p>Dear Travelers, Welcome to Lokenath Caterer and Travels, where every trip is a symphony of delightful surprises. 1. Feel at home wherever you go. Our dedicated team goes above and beyond to ensure your comfort, from personalized recommendations to seamless travel arrangements. 2. Savor the extraordinary in every bite. And get ready to taste amazing seafoods and chills of the mountains. 3. Uncover the soul of each destination with our expert guides. Discover hidden gems, cultural treasures, and iconic landmarks through the eyes of those who know them best.</p>
            <button className='btn btn-sm btn-primary mb-2' onClick={handleReadMore}>Read Less</button></>)}
        </div>
    );
}

export default CardItem;