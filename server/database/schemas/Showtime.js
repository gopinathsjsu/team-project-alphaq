const mongoose = require('mongoose');
const { AutoIncrementID } = require('@typegoose/auto-increment');

const showtimeSchema = new mongoose.Schema({
  _id: Number,
  movieId: { type: Number, ref: 'Movie' },
  theaterId: { type: Number, ref: 'Theater' },
  capacity: Number,
  startTime: Number,
  endTime: Number,
  status: Number,
  price: { adult: Number, child: Number },
  adults : Number,
  child: Number,
  reserved : Number
});


showtimeSchema.plugin(AutoIncrementID, {
  field: '_id',
  incrementBy: 1,
  startAt: 1,
  trackerCollection: 'counters',
  trackerModelName: 'Showtime',
});
module.exports = mongoose.model('Showtime', showtimeSchema);
