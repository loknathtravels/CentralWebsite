import React from 'react';
import '../CSS/gallery.css'; // Create this CSS file in the same folder as Gallery.js
import Navbar from './navbar';
import FooterComp from './footer';
const images = [
  { src: "https://firebasestorage.googleapis.com/v0/b/loknathcatererandtravels.appspot.com/o/ArunachalPradesh.jpg?alt=media&token=cac4b4e6-18f5-445a-ab7d-aad887038635", alt: '1', description: 'Description for Image 1' },
  { src: "https://firebasestorage.googleapis.com/v0/b/loknathcatererandtravels.appspot.com/o/IMG_20241031_153633.jpg?alt=media&token=711ef9ec-dbad-4d66-b61f-31d6009853a2", alt: '2', description: 'Description for Image 2' },
  { src: "https://firebasestorage.googleapis.com/v0/b/loknathcatererandtravels.appspot.com/o/20241013081529_IMG_3557.JPG?alt=media&token=dfd46918-cbb9-45f9-9331-3fc2fc71f944", alt: '2', description: 'Description for Image 2' },
  { src: "https://firebasestorage.googleapis.com/v0/b/loknathcatererandtravels.appspot.com/o/20241015103105_IMG_3602.JPG?alt=media&token=9f364faa-e74e-4095-b333-ae242af0d7b7", alt: '2', description: 'Description for Image 2' },
  { src: "https://firebasestorage.googleapis.com/v0/b/loknathcatererandtravels.appspot.com/o/20241018162312_IMG_3675.JPG?alt=media&token=5625a9de-cecf-4497-992c-79fb0495f7bd", alt: '2', description: 'Description for Image 2' },
  { src: "https://firebasestorage.googleapis.com/v0/b/loknathcatererandtravels.appspot.com/o/IMG-20241031-WA0001.jpg?alt=media&token=a98c4906-7da9-4665-8169-2ee3b4064e86", alt: '2', description: 'Description for Image 2' },
  { src: "https://firebasestorage.googleapis.com/v0/b/loknathcatererandtravels.appspot.com/o/IMG-20241016-WA0051.jpg?alt=media&token=2c464fbb-17ec-471d-86b3-f9ebebba87e7", alt: '2', description: 'Description for Image 2' },
  { src: "https://firebasestorage.googleapis.com/v0/b/loknathcatererandtravels.appspot.com/o/IMG-20241027-WA0003.jpg?alt=media&token=24a1f1f1-950a-4a5e-a4fa-8d0358d8f176", alt: '2', description: 'Description for Image 2' },
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
