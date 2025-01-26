import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { margin } from '@mui/system';

const firebaseConfig = {
    apiKey: "AIzaSyBJy6-DatxkugTsv2nTAlqcBAoAez2VoZo",
    authDomain: "loknathcatererandtravels.firebaseapp.com",
    projectId: "loknathcatererandtravels",
    storageBucket: "loknathcatererandtravels.appspot.com",
    messagingSenderId: "144363082479",
    appId: "1:144363082479:web:4a8b188eacd0ad85ce811a",
    measurementId: "G-M3FYP6LQLC"
  };

initializeApp(firebaseConfig);

const db = getFirestore();
const storage = getStorage();

const UpcomingToursBackend = () => {
  const [tours, setTours] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentTour, setCurrentTour] = useState(null);
  const [formData, setFormData] = useState({
    EntryId: '',
    TourDescription: '',
    DateOfJourney: '',
    Price: '',
    ImageLocation: ''
  });

  useEffect(() => {
    const fetchTours = async () => {
      const querySnapshot = await getDocs(collection(db, 'UpcomingTours'));
      const toursData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(toursData)
      setTours(toursData);
    };
    fetchTours();
  }, []);

  const handleOpen = (tour = null) => {
    setCurrentTour(tour);
    setFormData(tour || { EntryId: '', TourDescription: '', DateOfJourney: '', Price: '', ImageLocation: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentTour(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `uploads/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    setFormData({ ...formData, ImageLocation: downloadURL });
  };

  const handleSave = async () => {
    if (currentTour) {
      await updateDoc(doc(db, 'UpcomingTours', currentTour.id), formData);
    } else {
      await addDoc(collection(db, 'UpcomingTours'), formData);
    }
    setOpen(false);
    window.location.reload();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'UpcomingTours', id));
    setTours(tours.filter(tour => tour.id !== id));
  };

  const genericImage = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300&h=150";

  return (
    <div>
        <Navbar />
      <h1>Upcoming Tours</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '16px' }}>
        {tours.map(tour => (
          <Card key={tour.id} style={{ width: '300px', marginLeft:"3%", marginBottom:"3%", marginTop:"3%" }}>
            <CardContent>
            <img 
                src={tour.ImageLocation || genericImage} 
                alt="Tour" 
                style={{ width: '100%', height: '150px', objectFit: 'cover', marginLeft:"auto", marginRight:"auto", marginTop:"auto", marginTop:"3%", marginBottom:"3%"}} 
              />
              <Typography>{tour.TourDescription}</Typography>
              <Typography>Date: {tour.DateOfJourney}</Typography>
              <Typography>Price: {tour.Price}</Typography>
              {/* {tour.ImageLocation && <img src={tour.ImageLocation} alt="Tour" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />} */}
            </CardContent>
            <CardActions sx={{ marginLeft:"20%" }}>
              <Button color="primary" onClick={() => handleOpen(tour)}>Edit</Button>
              <Button color="secondary" onClick={() => handleDelete(tour.id)}>Delete</Button>
            </CardActions>
          </Card>
        ))}
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{currentTour ? 'Edit Tour' : 'Add Tour'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Entry ID"
            name="EntryId"
            fullWidth
            margin="normal"
            value={formData.EntryId}
            onChange={handleInputChange}
          />
          <TextField
            label="Description"
            name="TourDescription"
            fullWidth
            margin="normal"
            value={formData.TourDescription}
            onChange={handleInputChange}
          />
          <TextField
            label="Date of Journey"
            name="DateOfJourney"
            fullWidth
            margin="normal"
            type="date"
            value={formData.DateOfJourney}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Price"
            name="Price"
            fullWidth
            margin="normal"
            value={formData.Price}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            component="label"
            style={{ marginTop: '16px' }}
          >
            Upload Image
            <input type="file" hidden onChange={handleImageUpload} />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>Add Tour</Button>
    </div>
  );
};

export default UpcomingToursBackend;
