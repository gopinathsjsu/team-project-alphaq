/* eslint-disable function-paren-newline */
/* eslint-disable indent */

const express = require('express');
const mongoose = require('mongoose');

const { Booking, User, Show, Theater, Movie } = require('../database/schemas');

const { requireAuth } = require('./middleware');

// Dont need to add $
const numberToDollar = (number) =>
  number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

const generateTicketNumber = () => Math.floor(Math.random() * 1000000000);

function calculatePricing(show, user, child, adult, senior, applyRewardPoints) {
  const baseTicketPrice = show.price || 0;
  const onlineServiceFee = 1.5;
  const numberOfPointsRequireForOneDollarDiscount = 100;
  const rewardPointsValue = applyRewardPoints
    ? Math.floor(
        (user.rewardPoints || 0) / numberOfPointsRequireForOneDollarDiscount,
      )
    : 0;

  const totalTickets = child + adult + senior || 0;
  const subTotal = totalTickets * baseTicketPrice;
  const onlineFees = onlineServiceFee * totalTickets;
  const waivedOnlineFees = user.isPremium ? onlineFees : 0;
  const rewardPointDiscount = Math.min(subTotal, rewardPointsValue);
  const rewardPointsUsed = Math.min(
    user.rewardPoints || 0,
    subTotal * numberOfPointsRequireForOneDollarDiscount,
  );

  const finalTicketCost =
    subTotal + onlineFees - rewardPointDiscount - waivedOnlineFees;

  const response = {
    checkout: [
      {
        title: `Tickets cost (${totalTickets})`,
        costString: numberToDollar(finalTicketCost),
        cost: finalTicketCost,
      },
      {
        title: 'Online service fee ($1.5 each ticket)',
        costString: numberToDollar(onlineFees),
        cost: onlineFees,
      },
    ],
    totalCostDetails: {},
    rewardPointsEarned: Math.floor(finalTicketCost),
    rewardPointsUsed,
  };

  if (waivedOnlineFees > 0) {
    response.checkout.push({
      title: 'Online fee waived for premium user',
      costString: numberToDollar(-waivedOnlineFees),
      cost: -waivedOnlineFees,
    });
  }

  if (rewardPointDiscount > 0) {
    response.checkout.push({
      title: 'Reward points used',
      costString: numberToDollar(-rewardPointDiscount),
      cost: -rewardPointDiscount,
    });
  }

  response.totalCostDetails = {
    title: 'Total',
    costString: numberToDollar(finalTicketCost),
    cost: finalTicketCost,
  };

  return response;
}

const router = express.Router();

// CRUD Operations for Booking
// Create a new booking
router.post('/', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user's movie bookings
router.get('/', requireAuth, async (req, res) => {
  try {
    // Use req.userId to retrieve bookings for the authenticated user
    const userBookings = await Booking.find({ userId: req.userId });
    const respData = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const booking of userBookings) {
      try {
        const { seats, adult, child, senior, ticketId } = booking;

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
        const { date, lang, screen, price, reservedSeats } = showData;

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

        const { name: theaterName, location, city, state } = theaterData;

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

      const daysDifference = Math.floor(
        (currentDate - bookingDate) / (24 * 60 * 60 * 1000),
      );

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

router.get('/allTickets', requireAuth, async (req, res) => {
  try {
    // Use req.userId to retrieve bookings for the authenticated user
    const userBookings = await Booking.find({ userId: req.userId });
    const respData = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const booking of userBookings) {
      try {
        const { seats, adult, child, senior, ticketId } = booking;

        const { showId } = booking;
        // eslint-disable-next-line no-await-in-loop
        const showData = await Show.findById(showId);
        const { screen, price, movieId, theaterId, startTime, endTime } =
          showData;

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
          _id,
        } = movieData;

        const { name: theaterName } = theaterData;

        const respObj = {
          seats: seats.length,
          adult,
          child,
          senior,
          ticketId,
          screen,
          price,
          movieName,
          photo,
          releaseDate,
          studio,
          director,
          description,
          tags,
          duration,
          imdbRating,
          theaterName,
          startTime,
          endTime,
          _id,
          showId,
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
      const bookingDate = new Date(movie.startTime);

      const daysDifference = Math.floor(
        (currentDate - bookingDate) / (24 * 60 * 60 * 1000),
      );

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
    res.status(200).json(finalResp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/viewPrice', async (req, res) => {
  try {
    const { userId, showId, child, adult, senior, applyRewardPoints } =
      req.body;

    // Fetch the show and user details from the database
    const show = await Show.findById(showId);
    const user = await User.findById(userId);

    if (!show || !user) {
      return res.status(404).json({ message: 'Show or User not found' });
    }

    // Calculate the pricing
    const pricingResponse = calculatePricing(
      show,
      user,
      child,
      adult,
      senior,
      applyRewardPoints,
    );

    res.json(pricingResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a booking by ID
router.patch('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a booking by ID
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Validation Middleware
function validateBooking(req, res, next) {
  const { showId, userId, seats, adult, child, senior } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(showId) ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    return res.status(400).json({ message: 'Invalid showId or userId' });
  }

  if (
    !Array.isArray(seats) ||
    !seats.every((seat) => 'row' in seat && 'column' in seat)
  ) {
    return res.status(400).json({ message: 'Invalid seats format' });
  }

  if (
    typeof adult !== 'number' ||
    typeof child !== 'number' ||
    typeof senior !== 'number'
  ) {
    return res
      .status(400)
      .json({ message: 'Adult, child, and senior counts must be numbers' });
  }

  // if (
  //   typeof usedRewardPoints !== 'number' ||
  //   (ticketId && typeof ticketId !== 'number')
  // ) {
  //   return res
  //     .status(400)
  //     .json({ message: 'Invalid usedRewardPoints or ticketId' });
  // }

  next();
}

// bookTickets Booking Route
router.post('/bookTickets', validateBooking, async (req, res) => {
  try {
    const { showId, seats, userId, applyRewardPoints, child, adult, senior } =
      req.body;

    const show = await Show.findById(showId);
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }

    show.reservedSeats = show.reservedSeats || [];

    const isSeatAlreadyReserved = seats.some((seat) =>
      show.reservedSeats.some(
        (reservedSeat) =>
          reservedSeat.row === seat.row && reservedSeat.column === seat.column,
      ),
    );

    if (isSeatAlreadyReserved) {
      return res
        .status(400)
        .json({ message: 'One or more seats are already reserved' });
    }

    // Calculate the pricing

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const pricingResponse = calculatePricing(
      show,
      user,
      child,
      adult,
      senior,
      applyRewardPoints,
    );
    const { rewardPointsUsed, rewardPointsEarned, totalCostDetails } =
      pricingResponse;
    // Deduct reward points if used
    if (applyRewardPoints && rewardPointsUsed) {
      if (user.rewardPoints >= rewardPointsUsed) {
        user.rewardPoints -= rewardPointsUsed;
        await user.save();
      } else {
        return res.status(400).json({ message: 'Not enough reward points' });
      }
    }
    const newBooking = new Booking({
      ...req.body,
      totalPrice: totalCostDetails.cost || 0,
      ticketId: generateTicketNumber(),
    });
    newBooking.rewardsPointsEarned = rewardPointsEarned;
    await newBooking.save();

    user.rewardPoints = (user.rewardPoints || 0) + rewardPointsEarned;
    await user.save();

    show.reservedSeats.push(...seats);
    show.currentBookingCount = (show.currentBookingCount || 0) + seats.length;
    await show.save();

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
      show.currentBookingCount = Math.max(
        0,
        (show.currentBookingCount || 0) - numberOfSeatsBooked,
      );
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
