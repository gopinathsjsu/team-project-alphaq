const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  showId: String, 
  userId: String, 
  seats: [
    {
        row: Number,
        column: Number,
    }
  ],
  adult: Number,
  child: Number,
  senior: Number,
  usedRewardPoints: Number,
  ticketId: Number, 
  rewardsPointsEarned: Number,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
