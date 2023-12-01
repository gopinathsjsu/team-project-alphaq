const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  pincode: Number,   
  latitude: String,
  longitude: String,
  photo: String,
  screens: [{ 
    screenNumber: Number,
    seatingCapacity: Number
  }],
  moderators:[{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
});

module.exports = mongoose.model('Theater', theaterSchema);
