const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  description: String,
  duration: Number,
  studio: String,
  tags: { type: mongoose.Schema.Types.ObjectId, ref: 'genre' },
  liked: Boolean,
  releaseDate: Date,
  director: String,
  cast: [String],
  imdbRating: Float32Array
});

userSchema.plugin(AutoIncrementID, {
  field: '_id', // Use the correct field name
  incrementBy: 1,
  startAt: 1,
  trackerCollection: 'counters',
  trackerModelName: 'Movie',
});

module.exports = mongoose.model('Movie', movieSchema);
