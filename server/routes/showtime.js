const express = require('express');
const { Showtime } = require('../database/schemas'); // Adjust the path as per your project structure

const router = express.Router();

// Create a new showtime
router.post('/showtimes', async (req, res) => {
    try {
        const showtime = new Showtime(req.body);
        await showtime.save();
        res.status(201).send(showtime);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Get all showtimes
router.get('/showtimes', async (req, res) => {
    try {
        const showtimes = await Showtime.find({}).populate('movieId').populate('theaterId');
        res.send(showtimes);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a showtime by ID
router.get('/showtimes/:id', async (req, res) => {
    try {
        const showtime = await Showtime.findById(req.params.id).populate('movieId').populate('theaterId');
        if (!showtime) {
            return res.status(404).send('Showtime not found');
        }
        res.send(showtime);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a showtime
router.put('/showtimes/:id', async (req, res) => {
    try {
        const showtime = await Showtime.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!showtime) {
            return res.status(404).send('Showtime not found');
        }
        res.send(showtime);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete a showtime
router.delete('/showtimes/:id', async (req, res) => {
    try {
        const showtime = await Showtime.findByIdAndDelete(req.params.id);
        if (!showtime) {
            return res.status(404).send('Showtime not found');
        }
        res.send(showtime);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
