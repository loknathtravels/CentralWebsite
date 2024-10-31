import React from 'react';
import CardItem from './cardItem';
import { useState, useEffect } from 'react';

const Card = React.forwardRef((props, ref) => {
    const [isMobile, setIsMobile] = useState(3)

    const chunkArray = (array, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
          const chunk = array.slice(i, i + chunkSize);
          chunks.push(chunk);
        }
        return chunks;
      };
 
      const handleResize = () => {
        if (window.innerWidth < 870) {
            setIsMobile(1)
        } else {
            setIsMobile(3)
        }
      }
      useEffect(() => {
        window.addEventListener("resize", handleResize)
      })      
    return (
<div ref={ref} className="container">
    <hr></hr>
    <h3>Tour Programme</h3>
{chunkArray(props.items,isMobile).map((rowItem, rowIndex)=>(
    <div key={rowIndex} className="row">
        {rowItem.map((item, index)=>(
            <div key={index} className="col">
                <CardItem item={item}/>
            </div>)
        )}
    </div>)
    )}

</div>
    );
})

export default Card;