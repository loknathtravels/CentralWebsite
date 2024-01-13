import React from 'react';
import "../CSS/banner.css"


function Banner(props) {

    return (
    <div className='container-fluid'>
    <h2> Welcome to the official website of Loknath Caterer and Travels</h2>
      <div className="image-container">
        <h5> Operating Successfully since 1990<br/>
          Naihati, West Bengal, India<br/>
          Phone - 9831085877</h5>
        <span>
        <button className='button btn btn-dark mx-2 my-2' onClick={ props.scrollToComponent }>Tour Programme</button>
        <button className='button btn btn-dark mx-2 my-2' onClick={props.scrollToComponentContact}>Contact us</button>
        <a href= "https://www.facebook.com/LokenathTravelsNaihati/" target='_blank' rel="noopener noreferrer"><button className='button btn btn-dark mx-2 my-2'>Facebook Page</button></a></span>
      </div>
      <h6 id='branch-id'>We do not have any branch</h6>
    </div>
    );
}

export default Banner;