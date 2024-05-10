import './App.css';
import db from './MyComponents/firebaseSetup';
import { collection, getDocs } from "firebase/firestore";
import Card from './MyComponents/card';
import Navbar from './MyComponents/navbar';
import Banner from './MyComponents/banner';
import About from './MyComponents/about';
import Contact from './MyComponents/contact';
import Services from './MyComponents/services';
import FooterComp from './MyComponents/footer';
import Gallery from './MyComponents/gallery';
import { Route, Routes } from "react-router-dom";
import React, {useRef, useState, useEffect} from 'react';
import TestimonialList from './MyComponents/testimonialList';
import img from './Images/download.jpg';
function App() {


  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
        const itemsCollection = await getDocs(collection(db, 'Items'));
        const itemsArray = itemsCollection.docs.map(doc => ({
            id: doc.id,
            // Accessing each key in the document
            ...doc.data(),
        }));
        setItems(itemsArray);
    };

    fetchItems();
}, []);
  
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const scrollToComponent = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imageUrl: img
    },
    {
      id: 2,
      name: "Jane Smith",
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      imageUrl: img
    },
    // Add more testimonials as needed
  ];


  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element ={[
        <Navbar key={1}/>,
        <Banner scrollToComponent={() => scrollToComponent(scrollRef1)} scrollToComponentContact={() => scrollToComponent(scrollRef2)} key={2}/>,
        <Card items={items} ref={scrollRef1} key={3}/>,
        <Services/>,
        <Contact ref={scrollRef2} key={4}/>,<FooterComp key={5}/>]} />
      <Route path='/about' element={<About/>} />
      <Route path='/services' element={<TestimonialList testimonials={testimonials}/>} />
      <Route path='/gallery' element={<Gallery/>} />
      </Routes>
      </div>
  );
}

export default App;
