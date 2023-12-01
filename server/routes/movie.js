const express = require('express');
const mongoose = require('mongoose');
const { Movie, Genre } = require('../database/schemas');

const router = express.Router();

// Helper function to fetch genre names by their IDs
async function getGenreNamesByIds(genreIds) {
    const genres = await Promise.all(genreIds.map(async (id) => {
        const genre = await Genre.findById(id);
        return genre ? genre.name : null;
    }));
    return genres.filter(name => name !== null);
}

// Get all movies
router.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find({});
        const moviesWithGenreNames = await Promise.all(movies.map(async (movie) => {
            const genreNames = await getGenreNamesByIds(movie.genres);
            return { ...movie.toObject(), genres: genreNames };
        }));
        res.send(moviesWithGenreNames);
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
        const genreNames = await getGenreNamesByIds(movie.genres);
        res.send({ ...movie.toObject(), genres: genreNames });
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

        // Prepare the movie data with genre IDs
        const movieData = { ...req.body, genres: genreIds };

        // Create and save the movie
        const movie = new Movie(movieData);
        await movie.save();

        // Fetch genre names for response
        const genreNames = await getGenreNamesByIds(movieData.genres);

        res.status(201).send({ ...movie.toObject(), genres: genreNames });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete a movie by ID
router.delete('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).send();
        }

        // Fetch genre names before deletion
        const genreNames = await getGenreNamesByIds(movie.genres);

        await Movie.findByIdAndDelete(req.params.id);
        
        res.send({ ...movie.toObject(), genres: genreNames });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
