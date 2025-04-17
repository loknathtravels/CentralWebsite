import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import config from '../config';
import Navbar from './navbar';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid2,
  TextField,
  Typography,
  Snackbar,
  Alert,
  MenuItem
} from "@mui/material";
import axios from "axios";
import generatePDF from "../utils/generateprint";


const TourDetailsPage = () => {
  const location = useLocation();
  let bookingId = null;
  if (typeof (bookingId) === 'undefined' || bookingId === null || bookingId === '') {
    bookingId = location.state;
  }
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    numberOfAdults: "0",
    numberOfChildren: "0",
    address: "",
    phoneNumber: "",
    altPhoneNumber: "",
    destination: "",
    dateOfJourney: "",
    tourCostAdult: "0",
    tourCostChildren: "0",
    discount: "",
    totalCost: "0",
    internalRemarks: "",
    travelerNotes: "",
    bookingId:"",
    bookingStatus:"",
    totalTicketBill: "0",
    totalBill: "0",
    advanceToBePaid: "0",
    totalAdvancePaid: "0",
    totalBillDue: "0",
  });
  const [travelers, setTravelers] = useState([{ travelerName: "", dob: "", age: "", travelerPhoneNumber: "", email: "", travelerRemarks: "" }]); // Separate state for tickets
  const [alert, setAlert] = useState({ open: false, message: "", severity: "info" });
  const [otherBills, setOtherBills] = useState([{billId:"", amount:0, reason:"" }])


  useEffect(() => {
    // Fetch booking details on component load
    const fetchBookingDetails = async () => {
      if (bookingId !== null){
        try {
          const response = await axios.post(`${config.BASE_URL}/getBookingDetails`, {
            bookingId,
          });
          const data = response.data.data[0];
          console.log(data);
          setFormData({
            ...data,
          });
          setTravelers(data.allTickets || []); // Set tickets separately
          setOtherBills(data.otherBills)
        } catch (error) {
          console.error("Error fetching booking details:", error);
        }
      }
      else{
        setIsEditing(true);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTravelerChange = (event, index) => {
    const { name, value } = event.target;
  
    setTravelers((prevTravelers) =>
      prevTravelers.map((traveler, i) =>
        i === index ? { ...traveler, [name]: value } : traveler
      )
    );
  };

  const handleOtherBillsChange = (event, index) => {
    const { name, value } = event.target;
  
    setOtherBills((prevOtherBills) =>
      prevOtherBills.map((otherBill, i) =>
        i === index ? { ...otherBill, [name]: value } : otherBill
      )
    );
  };


  const addTraveler = () => {
    setTravelers([
      ...travelers,
      { ticketId:"", travelerName: "", dob: "", age: "", travelerPhoneNumber: "", email: "", travelerRemarks: "" },
    ]);
  };


  const deleteTraveler = () => {
    var l = travelers.length;
    if (l > 1) {
      const updatedTravelers = travelers.slice(0, -1);
      setTravelers(updatedTravelers);
    }
    else {
      setAlert({ open: true, message: `Last traveler cannnot be deleted, please keep blank if not required`, severity: "error" });
    }
  };

  const handleEdit = () => setIsEditing(true);

  const handleSubmit = async () => {
    try {
      const requestdata = {
        "formData":formData,
        "allTickets":travelers,
        "otherBills":otherBills
      }
      console.log(requestdata);
      const response = await fetch(`${config.BASE_URL}/postBookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestdata),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setFormData(data.formData || [])
      setTravelers(data.allTickets || [])
      setOtherBills(data.otherBills || [])
      setAlert({ open: true, message: `Booking is successful with booking id - ${data.formData.bookingId}`, severity: "success" });
      setIsEditing(false);
    } catch (error) {
      console.error("Error posting booking:", error);
      setAlert({ open: true, message: "Booking failed !", severity: "error" });
    }
  };


  const totalCost = React.useMemo(() => {
    return (
      (Number(formData.numberOfAdults) * Number(formData.tourCostAdult) +
        Number(formData.numberOfChildren) * Number(formData.tourCostChildren)) *
      (1 - Number(formData.discount) / 100)
    );
  }, [formData.discount, formData.numberOfChildren, formData.numberOfAdults, formData.tourCostAdult, formData.tourCostChildren]);

  const finalBill = Number(totalCost) + Number(formData.totalTicketBill) + Number(otherBills[0].amount);
  const due = Number(finalBill) - Number(formData.totalAdvancePaid);

  const updateFormData = (key, value) => setFormData(state => ({ ...state, [key]: value }));

  React.useEffect(() => {
    updateFormData("totalCost", totalCost);
    updateFormData("advanceToBePaid", Number(totalCost) * 0.4 + 150 * travelers.length + Number(otherBills[0].amount));
    updateFormData("totalBill", finalBill);
    updateFormData("totalBillDue", due);
  }, [totalCost, travelers.length, otherBills, formData.totalTicketBill, formData.totalAdvancePaid, finalBill, due]);


  return (
    <>
      <Navbar />
      <Box sx={{ p: 2 }}>
        <Card sx={{ml:"auto", mb:2}}>
          <CardContent>
            <Grid2 container spacing={5} >
              {[
                { label:"Booking ID", field:"bookingId", type:"text", disabled:true},
                { label: "Booking Status", field: "bookingStatus", type:"text", disabled:true}
                ].map((item) => (
                  <Grid2 item xs={12} sm={6} key={item}>
                 { item.type === "text" && (<TextField
                    fullWidth
                    label={item.label}
                    sx={{ml:"225%"}}
                    name={item.field}
                    value={formData[item.field]}
                    onChange={handleChange}
                    disabled={!isEditing || item.disabled}
                    InputLabelProps={{
                      shrink: true, // Prevents overlap
                    }}
                  />)}
                </Grid2>
                ))}
            </Grid2>
          </CardContent>
        </Card>
        {/* Tour Details Section */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Tour Details</Typography>
            <Grid2 container spacing={2}>
              {[
                { label: "Name", field: "name", type: "text", disabled:false, required:true },
                { label: "Number Of Adults", field: "numberOfAdults", type:"text", disabled:false, required:true },
                { label: "Number Of Children", field: "numberOfChildren", type:"text", disabled:false, required:true },
                { label: "Address", field: "address", type:"text", disabled:false, required:true },
                { label: "Primary Phone Number", field: "phoneNumber", type:"text", disabled:false, required:true},
                { label: "Alternate Phone Number", field: "altPhoneNumber", type:"text", disabled:false, required:false },
                { label: "Destination", field: "destination", type:"select", disabled:false, required:true},
                { label: "Date Of Journey", field: "dateOfJourney", type:"date", disabled:false, required:true},
                { label: "Tour Cost (Adult)", field: "tourCostAdult", type:"text", disabled:false, required:true},
                { label: "Tour Cost (Children)", field: "tourCostChildren", type:"text", disabled:false, required:true},
                { label: "Discount", field: "discount", type:"text", disabled:false, required:true},
                { label: "Total Cost", field: "totalCost", type:"text", disabled:true, required:true},
                { label: "Internal Remarks", field: "internalRemarks", type:"text", disabled:false, required:false},
                { label: "Traveler Notes", field: "travelerNotes", type:"text", disabled:false, required:false},
              ].map((item) => (
                <Grid2 item xs={12} sm={6} key={item}>
                 { item.type === "text" && (<TextField
                    fullWidth
                    label={item.label}
                    name={item.field}
                    required = {item.required}
                    value={formData[item.field]}
                    onChange={handleChange}
                    disabled={!isEditing || item.disabled}
                    InputLabelProps={{
                      shrink: true, // Prevents overlap
                    }}
                  />)}
                  {item.type === "date" && (
                    <TextField
                      fullWidth
                      type="date"
                      label={item.label}
                      name={item.field}
                      required = {item.required}
                      value={formData[item.field]}
                      onChange={handleChange}
                      disabled={!isEditing}
                      InputLabelProps={{
                        shrink: true, // Ensures the label does not overlap
                      }}
                    />
                  )}
                  {item.type === "select" && (
                    <TextField
                      select
                      fullWidth
                      label={item.label}
                      name={item.field}
                      required = {item.required}
                      value={formData[item.field]}
                      onChange={handleChange}
                      disabled={!isEditing}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      {/* Replace with your options */}
                      <MenuItem value="option1">Option 1</MenuItem>
                      <MenuItem value="option2">Option 2</MenuItem>
                      <MenuItem value="option3">Option 3</MenuItem>
                    </TextField>
                    )}
                </Grid2>
              ))}
            </Grid2>
          </CardContent>
        </Card>
        {/* Centered Snackbar */}
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "center", horizontal: "center" }} // Centers alert
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          variant="filled"
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
            padding: "20px",
            borderRadius: "8px",
            textAlign: "center",
            minWidth: "300px",
          }}
        >
          {alert.message}
        </Alert>
      </Snackbar>

        {/* Ticket Section */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Ticket Section</Typography>
            {travelers.map((traveler, index) => (
              <Box key={index} sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
                <Typography variant="subtitle1">Travelers {index + 1}</Typography>
                <Grid2 container spacing={2}>
                  {[
                    { label: "Traveler Name", field: "travelerName", type:"text", disabled:false, required:true },
                    { label: "Date of Birth", field: "dob", type:"date", disabled:false, required:true },
                    { label: "Age", field: "age", type:"text", disabled:false},
                    { label: "Phone Number", field: "travelerPhoneNumber", type:"text", disabled:false, required:true },
                    { label: "Email", field: "email", type:"text", disabled:false, required:false },
                    { label: "Remarks", field: "travelerRemarks", type:"text", disabled:false, required:false },
                  ].map((item) => (
                    <Grid2 item xs={12} sm={6} key={`${index}-${item.field}`}>
                      { item.type === "text" && (<TextField
                    fullWidth
                    label={item.label}
                    name={item.field}
                    required = {item.required}
                    value={traveler[item.field] || ""}
                    onChange={(e) => handleTravelerChange(e, index)}
                    disabled={!isEditing || item.disabled}
                    InputLabelProps={{
                      shrink: true, // Prevents overlap
                    }}
                  />)}
                  {item.type === "date" && (
                    <TextField
                      fullWidth
                      type="date"
                      label={item.label}
                      name={item.field}
                      required = {item.required}
                      value={traveler[item.field] || ""}
                      onChange={(e) => handleTravelerChange(e, index)}
                      disabled={!isEditing || item.disabled}
                      InputLabelProps={{
                        shrink: true, // Ensures the label does not overlap
                      }}
                    />
                  )}
                  {item.type === "select" && (
                    <TextField
                      select
                      fullWidth
                      label={item.label}
                      name={item.field}
                      required = {item.required}
                      value={traveler[item.field] || ""}
                      onChange={(e) => handleTravelerChange(e, index)}
                      disabled={!isEditing || item.disabled}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      {/* Replace with your options */}
                      <MenuItem value="option1">Option 1</MenuItem>
                      <MenuItem value="option2">Option 2</MenuItem>
                      <MenuItem value="option3">Option 3</MenuItem>
                    </TextField>
                    )}
                    </Grid2>
                  ))}
                </Grid2>
              </Box>
            ))}
          </CardContent>
        </Card>

        <Button variant="contained" onClick={addTraveler}>
          Add Traveler
        </Button>
        <Button variant="contained" onClick={deleteTraveler}>
          Delete Traveler
        </Button>

        {/* Others Section */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Others Section</Typography>
            {otherBills.map((otherBill, index) =>(
            <Grid2 container spacing={2}>
              {[
                { label: "Other Bills", field: "amount" },
                { label: "Other Remarks", field: "reason" },
              ].map((item) => (
                <Grid2 item xs={12} sm={6} key={`${index}`}>
                  <TextField
                    fullWidth
                    label={item.label}
                    name={item.field}
                    required = {item.required}
                    value={otherBill[item.field]}
                    onChange={(e) => handleOtherBillsChange(e, index)}
                    disabled={!isEditing}
                    InputLabelProps={{
                      shrink: true, // Prevents overlap
                    }}
                  />
                </Grid2>
              ))}
            </Grid2>))}
          </CardContent>
        </Card>

        {/* Summary Section */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Summary Section</Typography>
            <Grid2 container spacing={2}>
              {[
                { label: "Total Ticket Bill", field: "totalTicketBill", type:"text", disabled:false},
                { label: "Total Bill", field: "totalBill", type:"text", disabled:true, required:true },
                { label: "Advance Paid", field: "totalAdvancePaid", type:"text", disabled:false, required:true },
                { label: "Advance to be paid", field: "advanceToBePaid", type:"text", disabled:true, required:true },
                { label: "Total Bill Due", field: "totalBillDue", type:"text", disabled:true, required:true },
              ].map((item) => (
                <Grid2 item xs={12} sm={6} key={item}>
                  { item.type === "text" && (<TextField
                    fullWidth
                    label={item.label}
                    name={item.field}
                    required = {item.required}
                    value={formData[item.field]}
                    onChange={handleChange}
                    disabled={!isEditing || item.disabled}
                    InputLabelProps={{
                      shrink: true, // Prevents overlap
                    }}
                  />)}
                  {item.type === "date" && (
                    <TextField
                      fullWidth
                      type="date"
                      label={item.label}
                      name={item.field}
                      required = {item.required}
                      value={formData[item.field]}
                      onChange={handleChange}
                      disabled={!isEditing}
                      InputLabelProps={{
                        shrink: true, // Ensures the label does not overlap
                      }}
                    />
                  )}
                  {item.type === "select" && (
                    <TextField
                      select
                      fullWidth
                      label={item.label}
                      name={item.field}
                      required = {item.required}
                      value={formData[item.field]}
                      onChange={handleChange}
                      disabled={!isEditing}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      {/* Replace with your options */}
                      <MenuItem value="option1">Option 1</MenuItem>
                      <MenuItem value="option2">Option 2</MenuItem>
                      <MenuItem value="option3">Option 3</MenuItem>
                    </TextField>
                    )}
                </Grid2>
              ))}
            </Grid2>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Box sx={{ textAlign: "right", mt: 2 }}>
          {!isEditing ? (
            <>
              <Button variant="contained" onClick={handleEdit} sx={{ mr: 1 }}>
                Edit
              </Button>
              <Button variant="contained" onClick={() => generatePDF(formData, otherBills, travelers)}>Print</Button>
            </>
          ) : (
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          )}

          {/* Snackbar for Alert Messages */}

        </Box>
      </Box>
    </>
  );
};

export default TourDetailsPage;
