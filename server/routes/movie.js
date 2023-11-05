const express = require('express');
const mongoose = require('mongoose');

const { Movie } = require('../database/schemas');

const router   = express.Router();

module.exports = router;

// Search movies
router.get('/search', async(req, res) => {
  try {
    const searchString = req.query.q;
    // If searchString is not present, return all movies
    if (!searchString) {
      const allMovies = await Movie.find();
      return res.json(allMovies);
    }

    // Use a regular expression for case-insensitive partial matching
    const searchRegex = new RegExp(searchString, 'i');

    // Perform the search using the 'name' field only
    const searchResults = await Movie.find({ name: { $regex: searchRegex } });

    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
