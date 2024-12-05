/**
 * Itinerary.js
 * A React component styled with a neomorphic design that displays a day-wise itinerary of a trip.
 */

import React, { useState, useEffect } from "react";
import "../CSS/itinerary.css";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Navbar from './navbar';
import FooterComp from './footer';
import { useLocation } from "react-router-dom";

const Itinerary = () => {
  const [itineraries, setItineraries] = useState([]); // All itineraries fetched from Firestore
  const [itinerary, setItinerary] = useState([]); // Processed itinerary data to display

  const location = useLocation();
  console.log(location.state);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, "Itineraries"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItineraries(data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching itineraries:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const transformedItinerary = [];

    itineraries.forEach((iti) => {
      if (iti.id === location.state.Name) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        Object.keys(iti)
        .filter((key) => key !== "id")
        .sort() // Sort keys to maintain correct order
        .forEach((key) => {
          if (key !== "id") {
            transformedItinerary.push({
              id: key,
              details: iti[key],
            });
          }
        });
      }
    });

    if (transformedItinerary.length > 0) {
      setItinerary(transformedItinerary);
    }
  }, [itineraries]); 
// let itinerary = [
//     {
//       "id": "day1",
//       "details": "Visit the Eiffel Tower, explore local cafes."
//     },
//     {
//       "id": "day2",
//       "details": "Day trip to Versailles and Seine river cruise."
//     }
//   ]
  
  const generateShareableLink = () => {
    // Replace with logic to generate a shareable link
    alert("Shareable link generated: https://example.com/itinerary");
  };

  return (
    <div className="itinerary-container">
      <h1 className="itinerary-title">Itinerary of {location.state.Name}</h1>
      <div className="main-content">
        <div className="itinerary-wrapper">
          {itinerary.map((day, index) => (
            <div className="day-container" key={day.id}>
              <div className="day-header">
                <span>Day {index + 1}</span>
              </div>
              <div className="day-details">
                <p>{day.details}</p>
              </div>
            </div>
          ))}
        </div>

        <aside className="side-sections">
          <section className="quick-info">
            <h2>Quick Info</h2>
            <p>Get essential details about your trip, including weather, travel tips, and more.</p>
          </section>

          <section className="pricing-details">
            <h2>Pricing</h2>
            <p>Tour Cost without train or Air Fare - {location.state.Duration}</p>
            <p>Includes accommodations, travel, and meals.</p>
          </section>

          <section className="share-details">
            <h2>Share</h2>
            <button onClick={generateShareableLink}>Generate Shareable Link</button>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default Itinerary;
