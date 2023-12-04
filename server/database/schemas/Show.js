const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  theaterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theater' },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  startTime: Date,
  endTime: Date,
  date: Date,
  lang: String,
  screen: Number,
  capacity: Number,
  price: Number,
  currentBookingCount: Number,
  reservedSeats: [
    {
      row: Number,
      column: Number,
    },
  ],
});

const Show = mongoose.model('Show', showSchema);

module.exports = Show;
