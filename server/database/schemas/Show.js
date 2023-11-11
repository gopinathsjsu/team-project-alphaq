const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  theaterId: String,
  movieId: String,
  startTime: String,
  endTime: String,
  date: String,
  lang: String,
  screen: Number,
  capacity: Number,
  price: Number,
  currentBookingCount: Number,
});

const Show = mongoose.model('Show', showSchema);

module.exports = Show;
