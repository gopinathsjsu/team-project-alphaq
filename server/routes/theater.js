const express = require('express');
const { Theater } = require('../database/schemas'); // Adjust the path as per your project structure

const router = express.Router();

// Create a new theater
router.post('/theaters', async (req, res) => {
    try {
        const theater = new Theater(req.body);
        await theater.save();
        res.status(201).send(theater);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Get all theaters
router.get('/theaters', async (req, res) => {
    try {
        const theaters = await Theater.find({});
        res.send(theaters);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a theater by ID
router.get('/theaters/:id', async (req, res) => {
    try {
        const theater = await Theater.findById(req.params.id);
        if (!theater) {
            return res.status(404).send('Theater not found');
        }
        res.send(theater);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a theater
router.put('/theaters/:id', async (req, res) => {
    try {
        const theater = await Theater.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!theater) {
            return res.status(404).send('Theater not found');
        }
        res.send(theater);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete a theater
router.delete('/theaters/:id', async (req, res) => {
    try {
        const theater = await Theater.findByIdAndDelete(req.params.id);
        if (!theater) {
            return res.status(404).send('Theater not found');
        }
        res.send(theater);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
