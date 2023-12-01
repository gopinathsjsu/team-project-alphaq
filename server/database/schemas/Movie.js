const mongoose = require('mongoose');
const { AutoIncrementID } = require('@typegoose/auto-increment');

const movieSchema = new mongoose.Schema({
    _id: Number,
    image: String,
    name: String,
    description: String,
    duration: Number,
    studio: String,
    genres: [{ type: Number, ref: 'Genre' }], // Referencing Genre by its numeric _id
    liked: Boolean,
    releaseDate: Date,
    director: String,
    cast: [String],
    imdbRating: Number
});

movieSchema.plugin(AutoIncrementID, {
    field: '_id',
    incrementBy: 1,
    startAt: 1,
    trackerCollection: 'counters',
    trackerModelName: 'Movie',
});

module.exports = mongoose.model('Movie', movieSchema);
