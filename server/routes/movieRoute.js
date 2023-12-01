const express = require('express');
const router = express.Router();
const { Genre,Movie,Theater } = require('../database/schemas'); // Update this path to where your Genre model is located

router.get('/movie/page1', async (req, res) => {
    try {
        // Fetch genres
        const genres = await Genre.find();

        const currentDate = new Date();

        // Fetch upcoming movies
        const upcomingMovieList = await Movie.find({releaseDate: { $gt: currentDate }});

        // Fetch theaters
        const theaterList = await Theater.find();

        // Fetch movies by genre
        const genreMovieList = await Promise.all(genres.map(async genre => {
            const movies = await Movie.find({ genres: genre._id });
            return {
                _id: genre._id,
                name: genre.name,
                movieList: movies
            };
        }));

        // Construct the response
        const response = {
            genres,
            upcomingMovieList,
            theaterList,
            genreMovieList
        };

        res.json(response);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
