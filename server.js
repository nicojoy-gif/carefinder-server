const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require("multer");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const hospitalRoute = require('./routes/Hospital')
const loginRoute = require('./routes/Login')
const PORT = process.env.PORT || 5000;
const Hospital = require('./models/hospital'); 

// Load environment variables from .env file
dotenv.config();

app.use(cors());

// Check if the connection to MongoDB was successful
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.get('/api/todos', (req, res) => {
	return res.json({
		todos: [
			{
				title: 'Task1',
			},
			{
				title: 'Task2',
			},
			{
				title: 'Task3',
			},
		],
	});
});
async function insertHospitals() {
  try {
    const existingHospitals = await Hospital.find({});
    if (existingHospitals.length === 0) {
    await Hospital.insertMany([
      {
        name: "Jos University Teaching Hospital",
        city: "Jos",
        address: "19 Murtala Mohammed Way",
        phoneNumber: "0803 597 6561",
        email: "info@juth.org.ng",
      },
      {
        name: "Isalu Hospital",
        city: "Lagos",
        address: "349b Odusami Street, off Wemco Rd, Ogba, Ikeja",
        phoneNumber: "(234)916-985-4591",
        email: "feedback@isaluhospitals.com",
      },
      {
        name: "Atinu Critical Care Hospital",
        city: "Port Harcourt",
        address: "Elelenwo",
        phoneNumber: "09030002187",
        email: "info@atinucriticalcarehospital.com",
        
      },
      {
        name: "Save A Life Mission Hospital",
        city: "Port Harcourt",
        address: "Stadium road, Portharcourt",
        phoneNumber: "+234 704 400 0138",
        email: " info@savealifehospital.com",
      },
      {
        name: "University of Port Harcourt Teaching Hospital",
        city: "Port Harcourt",
        address: "East-west road, opposite alakahia junction",
        phoneNumber: "(+234)8182692056",
        email: "info@upthng.com",
      },
      {
        name: "Atinu Critical Care Hospital",
        city: "Port Harcourt",
        address: "Elelenwo",
        phoneNumber: "09030002187",
        email: "info@atinucriticalcarehospital.com",
        
      },
    ]);
      console.log('Hospitals inserted successfully.');
    } else {
      console.log('Hospitals already exist in the database.');
      } } catch (error) {
      console.error('Error inserting hospitals:', error);
    }
  }

  insertHospitals();
// Middleware // Enable CORS with custom options
app.use(helmet()); // Helmet for security headers
app.use(morgan("common")); // Morgan for request logging
app.use(express.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded requests

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

// Call the async function to connect to MongoDB
connectToDatabase();

// Define a sample route
app.get('/', (req, res) => {
  res.send('Hello, this is the backend server!');
});
app.use('/api/auth', loginRoute)
app.use('/api/hospital', hospitalRoute); 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});