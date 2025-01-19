import React from 'react'
import { Typography, Card, CardContent, Grid2, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';


const BookingCard = (props) => {
    const itemStyles = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '105px', // Fixed width for each item
    };
    const itemStylesIndex = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '11px', // Fixed width for each item
    };
    console.log(props.item);
    return (
        <Card style={{ width: "50%" ,marginLeft: 'auto', marginRight:"auto", marginTop:"1%", marginBottom:"1%"}}>
          <CardContent>
          <Grid2 container alignItems="center" spacing={2}>
          {/* Index */}
          <Grid2 item>
            <Box style={itemStylesIndex}>
              <Typography variant="body1">{props.index}</Typography>
            </Box>
          </Grid2>

          {/* Booking ID */}
          <Grid2 item>
            <Box style={itemStyles}>
              <Typography variant="body1">{props.item.booking_id}</Typography>
            </Box>
          </Grid2>

          {/* Destination */}
          <Grid2 item>
            <Box style={itemStyles}>
              <Typography variant="body1">{props.item.destination}</Typography>
            </Box>
          </Grid2>

          {/* Date of Journey */}
          <Grid2 item>
            <Box style={itemStyles}>
              <Typography variant="body1">{props.item.date_of_journey}</Typography>
            </Box>
          </Grid2>

          {/* Booking Status */}
          <Grid2 item>
            <Box style={itemStyles}>
              <Typography variant="body1">{props.item.booking_status}</Typography>
            </Box>
          </Grid2>

          {/* Name */}
          <Grid2 item>
            <Box style={itemStyles}>
              <Typography variant="body1">{props.item.name}</Typography>
            </Box>
          </Grid2>

          {/* Edit Button */}
          <Grid2 item>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Grid2>

          {/* Cancel Button */}
          <Grid2 item>
            <IconButton color="secondary">
              <CancelIcon />
            </IconButton>
          </Grid2>
        </Grid2>
          </CardContent>
        </Card>
      );
}


export default BookingCard