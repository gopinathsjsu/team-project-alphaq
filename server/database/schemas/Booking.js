const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  showId: { type: mongoose.Schema.Types.ObjectId, ref: 'Show' }, 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
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
  ticketId: Number, // in minutes
  rewardsPointsEarned: Number,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
