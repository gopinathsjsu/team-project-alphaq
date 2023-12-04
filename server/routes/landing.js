const express = require('express');

const { Movie, Genre, Theater } = require('../database/schemas');

const router   = express.Router();

module.exports = router;

// Search movies
router.get('/', async(req, res) => {
  try {
    const inputLatitude = parseFloat(req.query.lat);
    const inputLongitude = parseFloat(req.query.long);
    // Getting all genres
    const genreList = await Genre.find();

    // Getting list of upcoming movies
    const currentDate = new Date();
    const query = {
      releaseDate: { $gt: currentDate },
    };
    const movieList = await Movie.find(query).limit(4);

    // Getting the nearest theaters
    const pipeline = [
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [inputLongitude, inputLatitude],
          },
          distanceField: 'distance',
          spherical: true,
        },
      },
      {
        $limit: 4,
      },
    ];
    const theaterList = await Theater.aggregate(pipeline);

    // Getting movies grouped by genre
    const movieByGenreList = await Movie.aggregate([
      {
        $unwind: '$genre', // Split the "genre" array into separate documents
      },
      {
        $group: {
          _id: '$genre.name', // Group by the "genre.name" field
          movies: {
            $push: { // Push each movie document into the "movies" array
              _id: '$_id',
              photo: '$photo',
              name: '$name',
              releaseDate: '$releaseDate',
              studio: '$studio',
              director: '$director',
              description: '$description',
              tags: '$tags',
              imdbRating: '$imdbRating',
              duration: '$duration',
            },
          },
        },
      },
      {
        $match: {
          _id: { $ne: null }, // Filter out entries where "_id" (genre) is null
          movies: { $ne: [] }, // Filter out entries where "movies" array is empty
        },
      },
      {
        $project: {
          genre: '$_id', // Rename "_id" to "genre"
          movies: 1, // Include the "movies" array
          _id: 0, // Exclude "_id" from the output
        },
      },
    ]);
    res.json({
      genreList, movieList, theaterList, movieByGenreList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
