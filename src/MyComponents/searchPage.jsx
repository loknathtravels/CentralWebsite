import React from 'react'
import SearchComp from '../MyComponents/searchComp'
import BookingCard from './bookingCard';
import Navbar from './navbar';
import { Divider } from '@mui/material';


export default function SearchPage() {
    const item = {
        index:1,
        bookingId:'123213',
        destination:"sdflahsf",
        dateOfJourney:'1/22/2024',
        bookingStatus:'Booked',
        name:'noname'
    }
    return (
      <>
      <Navbar />
      <SearchComp />
      <hr style={{width:"70%", margin:"auto"}}></hr>
      <BookingCard item={item} /> 
      </>
    );
  }