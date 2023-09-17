// user.js

const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // You can add more fields as needed (e.g., name, profile picture, etc.)
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
