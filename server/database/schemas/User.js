const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  preferenceGenres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
