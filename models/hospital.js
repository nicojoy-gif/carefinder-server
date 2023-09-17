const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true,},
  address: { type: String, required: true, unique: true,},
  city: { type: String, required: true, unique: true, },
  phoneNumber: { type: String, unique: true, },
  email: { type: String, unique: true, },
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
