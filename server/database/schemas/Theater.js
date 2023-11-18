const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
  name: String,
  photo: String,
  location: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  lat: Number,
  long: Number,
  dist: Number,
  screens: [
    {
      screenNumber: Number,
      capacity: Number,
    },
  ],
});

const Theater = mongoose.model('Theater', theaterSchema);

module.exports = Theater;
