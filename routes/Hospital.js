const express = require('express')
const router = express.Router();
const Hospital = require('../models/hospital'); 
router.post('/hospital', async (req, res) => {
  try {
    const newHospitalData = req.body;
    const newHospital = new Hospital(newHospitalData);
    await newHospital.save();
    res.status(201).json({ message: 'Hospital added successfully', hospital: newHospital });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the hospital' });
  }
});
router.get('/search', async (req, res) => {
  const { city } = req.query;
  console.log('City:', city); 
  console.log('req.query:', req.query);
  try {
    const hospitals = await Hospital.find({ city });
    console.log('Hospitals:', hospitals);
    console.log('City:', city);
    res.json(hospitals);
  } catch (error) {
    console.error('Error:', error); 
    res.status(500).json({ error: 'An error occurred while fetching hospitals.' });
  }
});

module.exports = router;
