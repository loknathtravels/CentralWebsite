import React from 'react';
import '../CSS/gallery.css'; // Create this CSS file in the same folder as Gallery.js
import Navbar from './navbar';
import FooterComp from './footer';
import image1 from '../Images/download.jpg'
import image2 from '../Images/download2.jpg'
const images = [
  { src: image1, alt: '1', description: 'Description for Image 1' },
  { src: image1, alt: '2', description: 'Description for Image 2' },
  { src: image1, alt: '2', description: 'Description for Image 2' },
  { src: image2, alt: '2', description: 'Description for Image 2' },
  { src: image2, alt: '2', description: 'Description for Image 2' },
  { src: image2, alt: '2', description: 'Description for Image 2' },
  { src: image1, alt: '2', description: 'Description for Image 2' },
  { src: image1, alt: '2', description: 'Description for Image 2' },
  // Add more images here
];

const Gallery = () => {
  return (
    <>
    <Navbar/>
    <div className="gallery">
      <div className="gallery-items">
        {images.map((image, index) => (
          <div key={index} className="gallery-item">
            <img src={image.src} alt={image.alt} />
            <div className="description">{image.description}</div>
          </div>
        ))}
      </div>
    </div>
    <FooterComp/></>
  );
};

export default Gallery;
