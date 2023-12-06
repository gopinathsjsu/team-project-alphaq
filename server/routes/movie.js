const express = require('express');

const { Movie } = require('../database/schemas');

const router = express.Router();

module.exports = router;

// Search movies
router.get('/search', async (req, res) => {
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

// Getting a movie based on id
router.get('/:id', async (req, res) => {
  try {
    const movieId = req.params.id;

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a movie
router.post('/', async (req, res) => {
  try {
    const movieData = req.body;
    const newMovie = await Movie.create(movieData);
    res.status(201).json(newMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a movie by ID
router.put('/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const updatedMovieData = req.body;

    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      updatedMovieData,
      { new: true },
    );

    if (!updatedMovie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.json(updatedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a movie by ID
router.delete('/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const deletedMovie = await Movie.findByIdAndDelete(movieId);

    if (!deletedMovie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
