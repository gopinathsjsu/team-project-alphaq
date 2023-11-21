const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
  name: String,
  location: String,
  screens: [{ 
    screenNumber: Number,
    seatingCapacity: Number
  }]
});

module.exports = mongoose.model('Theater', theaterSchema);
