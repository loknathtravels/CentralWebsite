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



    console.log(props.item.ImageLocation);
    return (
        <div style={myStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='text-light'>
            <img className = "desc img" style={imgStyle} src= {props.item.ImageLocation}  alt='Location'/>
            <h5>{props.item.Name}</h5>
            <b>Date - {props.item.Date}</b>, 
                Duration - {props.item.Duration}
            {expanded ?(<>
            <p>{props.item.ShortDesc}</p>
            <button className='btn btn-sm btn-primary mb-2' onClick={handleReadMore}>Read More</button></>):
            (<><p>lorem ipsum dollar sit amet long text sdlfhsljdhfkjsdf sjfhskjdhfsjhfs f shdfkjsdkfskhfjkshdfk  shdfdkjshdfjksdkf s shdfkjhsdkjfhskdjf sdfhsdjkfh sdf hsjkdhfjksdhfkjsd hfkj shdfkjhsdkfh skdfhsdfsdjfhhd </p>
            <button className='btn btn-sm btn-primary mb-2' onClick={handleReadMore}>Read Less</button></>)}
        </div>
    );
}

export default CardItem;