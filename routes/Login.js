// Import the User schema defined in user.js
const admin = require('../Firebase/Index')
const User = require('../models/User');
const express = require('express')
const router = express.Router();

// Sign-up route
// Sign-up route
router.post('/signup', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user already exists in Firebase Authentication
      const userRecord = await admin.auth().createUser({
        email,
        password,
      });
  console.log(userRecord)
      // Create a new user using the User schema for MongoDB
      const user = new User({ email });
  
      // Save the user to the MongoDB database
      await user.save();
  
      // Handle successful registration
      res.status(201).send('User registered successfully');
    } catch (error) {
      // Handle registration error
      console.error(error);
      res.status(500).send('Registration failed');
    }
  });
  
// Login route
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Authenticate the user using Firebase Authentication
      await admin.auth().signInWithEmailAndPassword(email, password);
  
      // Find the user by email in the MongoDB database
      const user = await User.findOne({ email });
  
      // If the user doesn't exist, return an error
      if (!user) {
        return res.status(401).send('Login failed: User not found');
      }
  
      // Check if the provided password matches the stored password
      const isPasswordValid = await user.comparePassword(password);
  
      if (!isPasswordValid) {
        return res.status(401).send('Login failed: Incorrect password');
      }
  
      // Handle successful login
      res.status(200).send('Login successful');
    } catch (error) {
      // Handle login error
      console.error(error);
      res.status(401).send('Login failed');
    }
  });
  
  
module.exports = router;
