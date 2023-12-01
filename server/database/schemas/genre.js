const mongoose = require('mongoose');
const { AutoIncrementID } = require('@typegoose/auto-increment');

const genreSchema = new mongoose.Schema({
  name: String,
  _id: Number
});

genreSchema.plugin(AutoIncrementID, {
    field: '_id',
    incrementBy: 1,
    startAt: 1,
    trackerCollection: 'counters',
    trackerModelName: 'Genre',
  });

  const Genre = mongoose.model('Genre', genreSchema);
  module.exports = Genre;