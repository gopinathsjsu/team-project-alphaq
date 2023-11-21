
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  showtime: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime' },
  seats: [String],
  totalCost: Number,
  serviceFee: { type: Number, default: 1.50 },
  status: { type: String, enum: ['Booked', 'Cancelled', 'Completed'] },
  bookingTime: Date
});

module.exports = mongoose.model('Booking', bookingSchema);
