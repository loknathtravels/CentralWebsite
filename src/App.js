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
import TestimonialBlog from './MyComponents/testimonial-blog';
function App() {


  const [items, setItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
        const itemsCollection = await getDocs(collection(db, 'Items'));
        const itemsArray = itemsCollection.docs.map(doc => ({
            id: doc.id,
            // Accessing each key in the document
            ...doc.data(),
        }));
        setItems(itemsArray);
        const reviewsCollection = await getDocs(collection(db, 'Reviews'));
        const reviewsArray = reviewsCollection.docs.map(doc => ({
            id: doc.id,
            // Accessing each key in the document
            ...doc.data(),
        }));
        setItems(itemsArray);
        setReviews(reviewsArray)
    };

    fetchItems();
}, []);
  
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const scrollToComponent = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };


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
      <Route path='/testimonials' element={<TestimonialList testimonials = {reviews}/>} />
      <Route path='/gallery' element={<Gallery/>} />
      <Route path='/readTestimonial' element={<TestimonialBlog/>} />
      </Routes>
      </div>
  );
}

export default App;
