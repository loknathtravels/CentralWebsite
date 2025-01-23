import React, { useState, useEffect } from "react";
import Navbar from './navbar';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import generatePDF from "../utils/generateprint";

const TourDetailsPage = ({ bookingId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    numrOfAdults: "",
    numrOfChildren: "",
    address: "",
    phoneNumr: "",
    altPhoneNumr: "",
    destination: "",
    dateOfJourney: "",
    tourCostAdult: "",
    tourCostChildren: "",
    discount: "",
    totalCost: "",
    internalRemarks: "",
    travelerNotes: "",
    otherBills: "",
    otherRemarks: "",
    totalTicketBill: "",
    totalBill: "",
    advanceToBePaid: "",
    totalAdvancePaid: "",
    totalBillDue: "",
  });
  const bookingId2 = "AB20250109296737";
  const [tickets, setTickets] = useState([]); // Separate state for tickets

  useEffect(() => {
    // Fetch booking details on component load
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/getBookingDetails", {
          bookingId2,
        });
        const data = response.data.data[0];
        console.log(data);
        setFormData({
          ...data,
        });
        setTickets(data.tickets || []); // Set tickets separately
      } catch (error) {
        console.error("Error fetching booking details:", error);
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

  const handleTicketChange = (index, field, value) => {
    const updatedTickets = [...tickets];
    updatedTickets[index][field] = value;
    setTickets(updatedTickets);
  };

  const handleEdit = () => setIsEditing(true);

  const handleSubmit = () => {
    // Perform submit actions (e.g., API call)
    setIsEditing(false);
  };

  return (
    <>
    <Navbar />
    <Box sx={{ p: 2 }}>
      {/* Tour Details Section */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Tour Details</Typography>
          <Grid2 container spacing={2}>
            {[
              {label:"Name", field:"name"},
              {label:"Number Of Adults", field:"number_of_adults"},
              {label:"Number Of Children", field:"number_of_children"},
              {label:"Address", field:"address"},
              {label:"Primary Phone Number", field:"phone_number"},
              {label:"Alternate Phone Number", field:"alt_phone_number"},
              {label:"Destination", field:"destination"},
              {label:"Date Of Journey", field:"date_of_journey"},
              {label:"Tour Cost Adult", field:"tour_cost_adult"},
              {label:"tour Cost Children", field:"tour_cost_children"},
              {label:"Discount", field:"discount"},
              {label:"TotalCost", field:"total_cost"},
              {label:"Internal Remarks", field:"internal_remarks"},
              {label:"Traveler Notes", field:"traveler_notes"},
              {label:"Booking Status", field:"booking_status"},
            ].map((item) => (
              <Grid2 item xs={12} sm={6} key={item}>
                <TextField
                  fullWidth
                  label={item.label}
                  name={item.label}
                  value={formData[item.field]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  InputLabelProps={{
                    shrink: true, // Prevents overlap
                  }}
                />
              </Grid2>
            ))}
          </Grid2>
        </CardContent>
      </Card>

      {/* Ticket Section */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Ticket Section</Typography>
          {tickets.map((ticket, index) => (
            <Box key={index} sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
              <Typography variant="subtitle1">Ticket {index + 1}</Typography>
              <Grid2 container spacing={2}>
                {[
                  { label: "Traveler Name", field: "travelerName" },
                  { label: "Date of Birth", field: "dateOfBirth" },
                  { label: "Age", field: "age" },
                  { label: "Phone Number", field: "travelerPhoneNumber" },
                  { label: "Email", field: "email" },
                  { label: "Remarks", field: "travelerRemarks" },
                ].map(({ label, field }) => (
                  <Grid2 item xs={12} sm={6} key={field}>
                    <TextField
                      fullWidth
                      label={label}
                      name={field}
                      value={ticket[field] || ""}
                      onChange={(e) => handleTicketChange(index, field, e.target.value)}
                      disabled={!isEditing}
                      InputLabelProps={{
                        shrink: true, // Prevents overlap
                      }}
                    />
                  </Grid2>
                ))}
              </Grid2>
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* Others Section */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Others Section</Typography>
          <Grid2 container spacing={2}>
            {[
              {label:"Other Bills", field:""},
              {label:"Other Remarks", field:""},
            ].map((item) => (
              <Grid2 item xs={12} sm={6} key={item}>
                <TextField
                  fullWidth
                  label={item.label}
                  name={item.label}
                  value={formData[item.field]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  InputLabelProps={{
                    shrink: true, // Prevents overlap
                  }}
                />
              </Grid2>
            ))}
          </Grid2>
        </CardContent>
      </Card>

      {/* Summary Section */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Summary Section</Typography>
          <Grid2 container spacing={2}>
            {[
              {label:"Total Ticket Bill", field:"total_ticket_bill"},
              {label:"Total Bill", field:"total_bill"},
              {label:"Advance Paid", field:"total_advance_paid"},
              {label:"Advance to be paid", field:"advance_to_be_paid"},
              {label:"Total Bill Due", field:"total_bill_due"},
            ].map((item) => (
              <Grid2 item xs={12} sm={6} key={item}>
                <TextField
                  fullWidth
                  label={item.label}
                  name={item.label}
                  value={formData[item.field]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  InputLabelProps={{
                    shrink: true, // Prevents overlap
                  }}
                />
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
            <Button variant="contained" onClick={() => generatePDF(formData)}>Print</Button>
          </>
        ) : (
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </Box>
    </Box>
    </>
  );
};

export default TourDetailsPage;
