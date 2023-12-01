const express = require('express');
const router = express.Router();
const { Showtime, Theater } = require('../database/schemas'); // Update this path to where your models are located

router.get('/shows/getByMovieId/:movieId', async (req, res) => {
    try {
        const { movieId } = req.params;
        const { lat, long, date } = req.query;

        // Prepare the query for Showtime
        let query = { movieId: parseInt(movieId) }; // or just movieId if it's a string

        // If date is provided, adjust the query to include date range
        if (date) {
            const showDate = new Date(date);
            showDate.setHours(0, 0, 0, 0);
            const nextDay = new Date(showDate.getTime() + 24 * 60 * 60 * 1000);

            console.log('Searching for shows between:', showDate, 'and', nextDay);
            query.releaseDate = { $gte: showDate, $lte: nextDay };
        }

        // Get showtimes based on the query
        const showtimes = await Showtime.find(query);

        console.log('Showtimes found:', showtimes);

        // Check if there are no showtimes found
        if (!showtimes.length) {
            return res.status(404).json({ message: 'No showtimes found for the given criteria' });
        }

        // Extract theater IDs from showtimes
        const theaterIds = showtimes.map(showtime => showtime.theaterId);

        // Find theaters that match the theater IDs
        const theaters = await Theater.find({
            _id: { $in: theaterIds },
            // Add logic to filter by latitude and longitude if needed
        });

        res.json({
            showtimes,
            theaters
        });
    } catch (error) {
        console.error('Error in fetching showtimes:', error);
        res.status(500).send(error);
    }
});

module.exports = router;
