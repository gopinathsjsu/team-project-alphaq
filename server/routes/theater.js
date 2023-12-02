/* eslint-disable space-before-function-paren */
// routes/theaters.js
const express = require('express');

const router = express.Router();
const { Theater } = require('../database/schemas');

// Create a theater
router.post('/', async (req, res) => {
  try {
    const theaterData = req.body;
    const newTheater = await Theater.create(theaterData);
    res.status(201).json(newTheater);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all theaters
router.get('/', async (req, res) => {
  try {
    const theaters = await Theater.find();
    res.json(theaters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific theater by ID
router.get('/:id', async (req, res) => {
  try {
    const theaterId = req.params.id;
    const theater = await Theater.findById(theaterId);

    if (!theater) {
      return res.status(404).json({ error: 'Theater not found' });
    }

    res.json(theater);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a theater by ID
router.put('/:id', async (req, res) => {
  try {
    const theaterId = req.params.id;
    const updatedTheaterData = req.body;

    const updatedTheater = await Theater.findByIdAndUpdate(
      theaterId,
      updatedTheaterData,
      { new: true },
    );

    if (!updatedTheater) {
      return res.status(404).json({ error: 'Theater not found' });
    }

    res.json(updatedTheater);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a theater by ID
router.delete('/:id', async (req, res) => {
  try {
    const theaterId = req.params.id;
    const deletedTheater = await Theater.findByIdAndDelete(theaterId);

    if (!deletedTheater) {
      return res.status(404).json({ error: 'Theater not found' });
    }

    res.json({ message: 'Theater deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
