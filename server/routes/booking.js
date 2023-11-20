const express = require('express');
const mongoose = require('mongoose');


const {
  Booking, User, Show, Theater, Movie,
} = require('../database/schemas'); // Update this path to your Booking model

const { requireAuth } = require('./middleware');

const router = express.Router();

// CRUD Operations for Booking
// Create a new booking
router.post('/', async(req, res) => {

  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user's movie bookings
router.get('/', requireAuth, async(req, res) => {
  try {
    // Use req.userId to retrieve bookings for the authenticated user
    const userBookings = await Booking.find({ userId: req.userId });
    const respData = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const booking of userBookings) {
      try {
        const {
          seats,
          adult,
          child,
          senior,
          ticketId,
        } = booking;

        const bookingData = {
          seats,
          adult,
          child,
          senior,
          ticketId,
        };

        const { showId } = booking;
        // eslint-disable-next-line no-await-in-loop
        const showData = await Show.findById(showId);
        const {
          date,
          lang,
          screen,
          price,
          reservedSeats,
        } = showData;

        const showDetails = {
          date,
          lang,
          screen,
          price,
          reservedSeats,
        };
        const { movieId, theaterId } = showData;
        // eslint-disable-next-line no-await-in-loop
        const movieData = await Movie.findById(movieId);
        // eslint-disable-next-line no-await-in-loop
        const theaterData = await Theater.findById(theaterId);

        const {
          name: movieName,
          photo,
          releaseDate,
          studio,
          director,
          description,
          tags,
          duration,
          imdbRating,
        } = movieData;

        const {
          name: theaterName,
          location,
          city,
          state,
        } = theaterData;

        const movieDetails = {
          name: movieName,
          photo,
          releaseDate,
          studio,
          director,
          description,
          tags,
          duration,
          imdbRating,
        };

        const theaterDetails = {
          name: theaterName,
          location,
          city,
          state,
        };
        const respObj = {
          bookingData,
          showDetails,
          movieDetails,
          theaterDetails,
        };
        respData.push(respObj);
      } catch (error) {
        console.error(error);
        // Handle error if needed
      }
    }
    // Logic for filtering based on dates
    const currentDate = new Date();

    const upcoming = [];
    const watched = [];

    respData.forEach((movie) => {
      const bookingDate = new Date(movie.showDetails.date);

      const daysDifference = Math.floor((currentDate - bookingDate) / (24 * 60 * 60 * 1000));

      if (daysDifference >= 0 && daysDifference <= 30) {
        // Movie is watched in the last 30 days
        watched.push(movie);
      } else if (bookingDate >= currentDate) {
        // Movie is upcoming
        upcoming.push(movie);
      }
    });
    const finalResp = {
      watched,
      upcoming,
    };
    res.json(finalResp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a single booking by ID
router.get('/:id', async(req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a booking by ID
router.patch('/:id', async(req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a booking by ID
router.delete('/:id', async(req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/viewPrice', async(req, res) => {
  try {
    const {
      userId, showId, seats, child, adult, senior, usingRewardPoints,
    } = req.body;

    // Fetch the show and user details from the database
    const show = await Show.findById(showId);
    const user = await User.findById(userId);

    if (!show || !user) {
      return res.status(404).json({ message: 'Show or User not found' });
    }

    // Calculate the pricing
    const pricingResponse = calculatePricing(show, user, seats, child, adult, senior, usingRewardPoints);

    res.json(pricingResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

function calculatePricing(show, user, seats, child, adult, senior, usingRewardPoints) {
    const baseTicketPrice = show.price;
    const onlineServiceFee = 1.5;
    const premiumUserDiscount = user.isPremium ? 0.1 : 0;
    const rewardPointsValue = usingRewardPoints ? user.rewardPoints / 100 : 0;

    const totalTickets = child + adult + senior;
    const totalTicketCost = totalTickets * baseTicketPrice;

    const discountAmount = premiumUserDiscount * totalTicketCost;

    const finalTicketCost = totalTicketCost - discountAmount;
    const finalRewardPointsCost = Math.min(finalTicketCost, rewardPointsValue);

    let response = {
        "checkout": [
            { title: 'Tickets cost', cost: finalTicketCost },
            { title: 'Online service fee', cost: onlineServiceFee },
            { title: 'Premium user discount', cost: -discountAmount },
            { title: 'Reward points used', cost: -finalRewardPointsCost },
            { title: 'Total', cost: finalTicketCost+onlineServiceFee-discountAmount-finalRewardPointsCost }

        ],
        "rewardPointsEarned": Math.trunc(finalTicketCost),
    };

  return response;
}

// Validation Middleware
function validateBooking(req, res, next) {
    const { showId, userId, seats, adult, child, senior, usedRewardPoints, ticketId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(showId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid showId or userId' });
    }

    if (!Array.isArray(seats) || !seats.every(seat => 'row' in seat && 'column' in seat)) {
        return res.status(400).json({ message: 'Invalid seats format' });
    }

    if (typeof adult !== 'number' || typeof child !== 'number' || typeof senior !== 'number') {
        return res.status(400).json({ message: 'Adult, child, and senior counts must be numbers' });
    }

    if (typeof usedRewardPoints !== 'number' || (ticketId && typeof ticketId !== 'number')) {
        return res.status(400).json({ message: 'Invalid usedRewardPoints or ticketId' });
    }

    next();
}

// Confirm Booking Route
router.post('/confirm', validateBooking, async (req, res) => {
    try {
        const { showId, seats, userId, usingRewardPoints } = req.body;

        const show = await Show.findById(showId);
        if (!show) {
            return res.status(404).json({ message: 'Show not found' });
        }

        show.reservedSeats = show.reservedSeats || [];

        const isSeatAlreadyReserved = seats.some(seat =>
            show.reservedSeats.some(reservedSeat =>
                reservedSeat.row === seat.row && reservedSeat.column === seat.column
            )
        );

        if (isSeatAlreadyReserved) {
            return res.status(400).json({ message: 'One or more seats are already reserved' });
        }

        show.reservedSeats.push(...seats);
        show.currentBookingCount = (show.currentBookingCount || 0) + seats.length;
        await show.save();

        // Calculate the pricing
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const pricingResponse = calculatePricing(show, user, seats, req.body.child, req.body.adult, req.body.senior, usingRewardPoints);
        const totalTicketCost = pricingResponse.checkout.find(item => item.title === 'Tickets cost').cost;

        // Deduct reward points if used
        if (usingRewardPoints) {
            const rewardPointsValue = Math.trunc(totalTicketCost); // Example calculation
            if (user.rewardPoints >= rewardPointsValue) {
                user.rewardPoints -= rewardPointsValue;
                await user.save();
            } 
        }
        const newBooking = new Booking(req.body);
        newBooking.rewardsPointsEarned = Math.trunc(totalTicketCost);
        console.log(newBooking) // Assuming this is how you calculate earned points
        await newBooking.save();
        // updating user reward points after purchase of ticket
        user.rewardPoints=Math.trunc(totalTicketCost);
        await user.save();

        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Cancel Booking Route
router.post('/cancel', async (req, res) => {
    try {
        const { bookingId } = req.body;

        // Find the booking
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Find the show and update the current booking count
        const show = await Show.findById(booking.showId);
        if (show) {
            const numberOfSeatsBooked = booking.seats.length;
            show.currentBookingCount = Math.max(0, (show.currentBookingCount || 0) - numberOfSeatsBooked);
            await show.save();
        }

        // Reverse reward points if they were used
        const user = await User.findById(booking.userId);
        if (user && booking.rewardsPointsEarned) {
            user.rewardPoints -= booking.rewardsPointsEarned; // Deduct the reward points earned from this booking
            await user.save();
        }

        // Delete the booking
        await Booking.findByIdAndDelete(bookingId);

        res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
