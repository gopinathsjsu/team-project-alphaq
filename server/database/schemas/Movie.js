const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  photo: String,
  name: String,
  releaseDate: Date,
  studio: String,
  director: String,
  description: String,
  tags: [{ name: String, _id: mongoose.Schema.Types.ObjectId }],
  liked: Boolean,
  duration: Number, // in minutes
  imdbRating: Number,
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
