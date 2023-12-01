const express = require('express');
const mongoose = require('mongoose');
const { Movie } = require('../database/schemas');
const { Genre } = require('../database/schemas');

const router = express.Router();

// Get all movies
router.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.send(movies);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a movie by ID
router.get('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).send();
        }
        res.send(movie);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Create a new movie
router.post('/movies', async (req, res) => {
  try {
      if (!Array.isArray(req.body.genres)) {
          throw new Error('Genres not provided or not in array format');
      }

      // Find numeric ID for each genre name
      const genreIds = await Promise.all(req.body.genres.map(async (genreName) => {
          const genre = await Genre.findOne({ name: genreName });
          if (!genre) {
              throw new Error(`Genre not found with name: ${genreName}`);
          }
          return genre._id;
      }));

      const movieData = { ...req.body, genres: genreIds };
      const movie = new Movie(movieData);
      await movie.save();
      res.status(201).send(movie);
  } catch (error) {
      res.status(400).send(error.message);
  }
});

// Delete a movie by ID
router.delete('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).send();
        }
        res.send(movie);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
