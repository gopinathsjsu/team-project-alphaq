const mongoose = require('mongoose');
const { AutoIncrementID } = require('@typegoose/auto-increment');

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
  moderators:[{ type: String, ref: 'user' }]
});


theaterSchema.plugin(AutoIncrementID, {
  field: '_id',
  incrementBy: 1,
  startAt: 1,
  trackerCollection: 'counters',
  trackerModelName: 'Theater',
});

module.exports = mongoose.model('Theater', theaterSchema);
