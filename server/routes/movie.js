const express = require('express');
const { Movie } = require('../database/schemas');

const router = express.Router();

// Define routes for the Movie model
// Example: GET route to fetch all movies
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
      console.log(movie)
      if (!movie) {
        return res.status(404).send();
      }
      res.send(movie);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
router.post('/movies', async (req, res) => {
    try {
      const movie = new Movie(req.body);
      await movie.save();
      res.status(201).send(movie);
    } catch (error) {
      res.status(400).send(error);
    }
  });

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
