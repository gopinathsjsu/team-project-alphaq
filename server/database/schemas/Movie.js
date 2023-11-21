const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: Number,
  genre: [String],
  releaseDate: Date,
  director: String,
  cast: [String]
});

module.exports = mongoose.model('Movie', movieSchema);
