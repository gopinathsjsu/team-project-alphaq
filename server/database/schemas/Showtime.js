const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  theater: { type: mongoose.Schema.Types.ObjectId, ref: 'Theater' },
  screen: Number,
  startTime: Date,
  endTime: Date,
  price: Number,
  discount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Showtime', showtimeSchema);
