import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import { MenuItem, FormControl, TextField, OutlinedInput, InputLabel, Button, Card} from '@mui/material';
import { Margin } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
export default function SearchComp() {
    const [searchState, setSearchState] = useState({searchData:"", destinations:[], dateOfJourney:null, bookingStatus:[], name:""})
    const handleChangeDestination = (event) => {
        // console.log(searchState)
        const value = event.target.value
        const data = typeof value === 'string' ? value.split(',') : value
        setSearchState(
          // On autofill we get a stringified value.
          (state) => {
            return {...state,destinations: [...data]}
          }
        );
      };
      const handleChangeStatus = (event) => {
        // console.log(searchState)
        const value = event.target.value
        setSearchState(
          // On autofill we get a stringified value.
          (state) => {
            return {...state,bookingStatus: [...state.bookingStatus, ...( typeof value === 'string' ? value.split(',') : value)]}
          }
        );
      };

    const handleSubmit = (data) => {

      fetch('http://127.0.0.1:8000/api/getBookingDetails', {
        method: 'POST', // Change to POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send the data in the body as JSON
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
  };

    const myStylesDiv = {width:"60%", margin:"auto"}
    const myStylesForm = {width:"30%"}
    const destinations = [
        'Nepal',
        'Bhutan',
        'Kashmir',
        'South India',
        'North India',
      ];
  return (
    <div style={{margin:"1%"}}>
    <Card style={myStylesDiv}>
        <FormControl sx={{ m: 1}} style={myStylesForm}>
            <TextField 
            id="Search" 
            label="Booking ID" 
            variant="outlined" 
            value={searchState.searchData}
            onChange={(event) => {
                setSearchState((state) => ({...state, searchData:event.target.value}))}} />
        </FormControl>
        <FormControl sx={{ m: 1}} style={myStylesForm}>
            <TextField 
            id="Search" 
            label="Name" 
            variant="outlined" 
            value={searchState.name}
            onChange={(event) => {
                setSearchState((state) => ({...state, name:event.target.value}))}} />
        </FormControl>
      <FormControl sx={{ m: 1, }} style={myStylesForm}>
        <InputLabel id="demo-multiple-name-label">Destinations</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          label = "Destinations"
          id="demo-multiple-name"
          multiple
          value={searchState.destinations}
          onChange={handleChangeDestination}
          input={<OutlinedInput label="Destinations" />}
          MenuProps={MenuProps}
        >
          {destinations.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, }} style={{width:"45%"}}>
        <InputLabel id="demo-multiple-name-label">Booking Status</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          label = "Destinations"
          id="demo-multiple-name"
          multiple
          value={searchState.bookingStatus}
          onChange={handleChangeStatus}
          input={<OutlinedInput label="Booking Status" />}
          MenuProps={MenuProps}
        >
          {destinations.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl style={{width:"45%", margin:"1%"}}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Date of Journey"
        value={searchState.dateOfJourney}
        onChange={(event) => { 
          setSearchState((state) => ({...state, dateOfJourney:event.target.data}))}}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
    </FormControl>
    <FormControl sx={{ m: 2}}>
    <Button
       sx ={{ ':hover': {
       bgcolor: 'primary.main',
       color: 'white',
        }}}
        variant = "outlined"
        onClick={() => handleSubmit(searchState)}
        >
        Search
        </Button>
    </FormControl>
    </Card>
    </div>
  );
}