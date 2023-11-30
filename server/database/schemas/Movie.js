const mongoose = require('mongoose');
const { AutoIncrementID } = require('@typegoose/auto-increment');

const movieSchema = new mongoose.Schema({
  _id: Number,
  image: String,
  name: String,
  description: String,
  duration: Number,
  studio: String,
  tags: { type: mongoose.Schema.Types.ObjectId, ref: 'genre' },
  liked: Boolean,
  releaseDate: Date,
  director: String,
  cast: [String],
  imdbRating: Number // Corrected type
});

movieSchema.plugin(AutoIncrementID, {
  field: '_id',
  incrementBy: 1,
  startAt: 1,
  trackerCollection: 'counters',
  trackerModelName: 'Movie',
});

// Inside Movie.js
module.exports = mongoose.model('Movie', movieSchema);
