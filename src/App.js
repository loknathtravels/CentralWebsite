import './App.css';
import Card from './MyComponents/card';
import Navbar from './MyComponents/navbar';
import Banner from './MyComponents/banner';
import About from './MyComponents/about';
import Contact from './MyComponents/contact';
import Services from './MyComponents/services';
import FooterComp from './MyComponents/footer';
import Gallery from './MyComponents/gallery';
import { Route, Routes } from "react-router-dom";
import React, {useRef} from 'react';
import image1 from "./Images/download-card.jpeg"

function App() {

  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const scrollToComponent = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  

  let Items = [
    {
      Name:"North Bengal",
      ShortDesc:"lorem ipsum something",
      ImageLocation:image1,
      Date:"10/10/23",
      Duration:"15 days"
    },
    {
      Name:"South Bengal",
      ShortDesc:"lorem ipsum something",
      ImageLocation:image1,
      Date:"10/10/23",
      Duration:"15 days"
    },
    {
      Name:"North India",
      ShortDesc:"lorem ipsum something",
      ImageLocation:image1,
      Date:"10/10/23",
      Duration:"15 days"
    },
    {
      Name:"North Bengal",
      ShortDesc:"lorem ipsum something",
      ImageLocation:image1,
      Date:"10/10/23",
      Duration:"15 days"
    },
    {
      Name:"North Bengal",
      ShortDesc:"lorem ipsum something",
      ImageLocation:image1,
      Date:"10/10/23",
      Duration:"15 days"
    },
    {
      Name:"North Bengal",
      ShortDesc:"lorem ipsum something",
      ImageLocation:image1,
      Date:"10/10/23",
      Duration:"15 days"
    },
    {
      Name:"North Bengal",
      ShortDesc:"lorem ipsum something",
      ImageLocation:image1,
      Date:"10/10/23",
      Duration:"15 days"
    },
    {
      Name:"North Bengal",
      ShortDesc:"lorem ipsum something",
      ImageLocation:image1,
      Date:"10/10/23",
      Duration:"15 days"
    },
    {
      Name:"North Bengal",
      ShortDesc:"lorem ipsum something",
      ImageLocation:image1,
      Date:"10/10/23",
      Duration:"15 days"
    },
    {
      Name:"North Bengal",
      ShortDesc:"lorem ipsum something",
      ImageLocation:image1,
      Date:"10/10/23",
      Duration:"15 days"
    }
  ]

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element ={[
        <Navbar key={1}/>,
        <Banner scrollToComponent={() => scrollToComponent(scrollRef1)} scrollToComponentContact={() => scrollToComponent(scrollRef2)} key={2}/>,
        <Card items={Items} ref={scrollRef1} key={3}/>,
        <Contact ref={scrollRef2} key={4}/>,<FooterComp key={5}/>]} />
      <Route path='/about' element={<About/>} />
      <Route path='/services' element={<Services/>} />
      <Route path='/gallery' element={<Gallery/>} />
      </Routes>
      </div>
  );
}

export default App;
