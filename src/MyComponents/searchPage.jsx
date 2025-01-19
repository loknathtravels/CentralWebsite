import {React, useState} from 'react'
import SearchComp from '../MyComponents/searchComp'
import BookingCard from './bookingCard';
import Navbar from './navbar';
import { Divider } from '@mui/material';


export default function SearchPage() {

    const [mainData, setMainData] = useState([])
    const item = {
        index:1,
        bookingId:'123213',
        destination:"sdflahsf",
        dateOfJourney:'1/22/2024',
        bookingStatus:'Booked',
        name:'noname'
    }
    const handleDataFetch = (fetchedData) => {
      setMainData(fetchedData.data);
    }
    return (
      <>
      <Navbar />
      <SearchComp onDataFetch = {handleDataFetch}/>
      <hr style={{width:"70%", margin:"auto"}}></hr>
      {
        mainData.map((item, index) => (
        <BookingCard key={item.booking_id} item={item} index={index+1}/>
      ))} 
        </>
    );
  }