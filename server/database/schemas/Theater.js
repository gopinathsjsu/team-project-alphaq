const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
  name: String,
  photo: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number],
  },
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  lat: Number,
  long: Number,
  dist: Number,
  screens: [{
    screenNumber: Number,
    capacity: Number,
  }],
});

// Add a 2dsphere index on the location field
theaterSchema.index({ location: '2dsphere' });

const Theater = mongoose.model('Theater', theaterSchema);

module.exports = Theater;
