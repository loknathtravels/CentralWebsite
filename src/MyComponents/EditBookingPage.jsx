import React, { useState, useEffect } from "react";
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

  const [tickets, setTickets] = useState([]); // Separate state for tickets

  useEffect(() => {
    // Fetch booking details on component load
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/getBookingDetails", {
          params: { bookingId },
        });
        const data = response.data;

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
    <Box sx={{ p: 2 }}>
      {/* Tour Details Section */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Tour Details</Typography>
          <Grid2 container spacing={2}>
            {[
              "name",
              "numrOfAdults",
              "numrOfChildren",
              "address",
              "phoneNumr",
              "altPhoneNumr",
              "destination",
              "dateOfJourney",
              "tourCostAdult",
              "tourCostChildren",
              "discount",
              "totalCost",
              "internalRemarks",
              "travelerNotes",
            ].map((field) => (
              <Grid2 item xs={12} sm={6} key={field}>
                <TextField
                  fullWidth
                  label={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  disabled={!isEditing}
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
              "otherBills",
              "otherRemarks",
            ].map((field) => (
              <Grid2 item xs={12} sm={6} key={field}>
                <TextField
                  fullWidth
                  label={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  disabled={!isEditing}
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
              "totalTicketBill",
              "totalBill",
              "advanceToBePaid",
              "totalAdvancePaid",
              "totalBillDue",
            ].map((field) => (
              <Grid2 item xs={12} sm={6} key={field}>
                <TextField
                  fullWidth
                  label={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  disabled={!isEditing}
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
            <Button variant="outlined">Print</Button>
          </>
        ) : (
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default TourDetailsPage;
