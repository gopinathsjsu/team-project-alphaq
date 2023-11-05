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

// Getting a movie based on id
router.get('/:id', async(req, res) => {
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
router.post('/', async(req, res) => {
  try {
    const movieData = req.body;
    const newMovie = await Movie.create(movieData);
    res.status(201).json(newMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/bulk', async (req, res) => {
  try {
    const genresData = [
      {
          "_id": "656ac16ba1f5165ba824323b",
          "name": "Romance"
      },
      {
          "_id": "656ac176a1f5165ba824323d",
          "name": "Sci-fi"
      },
      {
          "_id": "656ac17ba1f5165ba824323f",
          "name": "Drama"
      },
      {
          "_id": "656ac180a1f5165ba8243241",
          "name": "Action"
      },
      {
          "_id": "656ac185a1f5165ba8243243",
          "name": "Horror"
      },
      {
          "_id": "656bb6d64ff726724b389bd2",
          "name": "Comedy"
      },
      {
          "_id": "656bc3e9dcfd4b6cff18e701",
          "name": "Adventure"
      },
      {
          "_id": "656bc3fadcfd4b6cff18e702",
          "name": "Fantasy"
      },
      {
          "_id": "656da4f3d1ad98a5f7fc1385",
          "name": "Animation"
      },
      {
          "_id": "656da50ed1ad98a5f7fc1388",
          "name": "Family"
      },
      {
          "_id": "656da52fd1ad98a5f7fc138b",
          "name": "Crime"
      },
      {
          "_id": "656da546d1ad98a5f7fc138e",
          "name": "Thriller"
      },
      {
          "_id": "656da551d1ad98a5f7fc1390",
          "name": "History"
      },
      {
          "_id": "656da55cd1ad98a5f7fc1392",
          "name": "Mystery"
      },
      {
          "_id": "656da562d1ad98a5f7fc1394",
          "name": "War"
      },
      {
          "_id": "656da56ad1ad98a5f7fc1396",
          "name": "Foreign"
      },
      {
          "_id": "656da574d1ad98a5f7fc1398",
          "name": "Music"
      },
      {
          "_id": "656da57bd1ad98a5f7fc139a",
          "name": "Documentary"
      },
      {
          "_id": "656da581d1ad98a5f7fc139c",
          "name": "Western"
      }
  ];
  
  // Create a mapping of genre names to _id
  const genreIdMapping = {};
  genresData.forEach(genre => {
    genreIdMapping[genre.name] = genre._id;
  });
  let movieData = req.body;

  for (let movie of movieData) {
      // Convert duration from ISO 8601 format to minutes
      movie.duration = convertDurationToMinutes(movie.duration);

      // Map genre names to _id
      movie.tags = movie.tags.map(tagName => {
          return { name: tagName, _id: genreIdMapping[tagName] || null };
      });
  }

  const newMovies = await Movie.insertMany(movieData);
  res.status(201).json(newMovies);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});

function convertDurationToMinutes(duration) {
const matches = duration.match(/PT(\d+H)?(\d+M)?/);
const hours = matches[1] ? parseInt(matches[1]) : 0;
const minutes = matches[2] ? parseInt(matches[2]) : 0;
return hours * 60 + minutes;
}
// Update a movie by ID
router.put('/:id', async(req, res) => {
  try {
    const movieId = req.params.id;
    const updatedMovieData = req.body;

    const updatedMovie = await Movie.findByIdAndUpdate(movieId, updatedMovieData, { new: true });

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
router.delete('/:id', async(req, res) => {
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
