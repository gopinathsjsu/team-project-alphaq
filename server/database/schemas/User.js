const { AutoIncrementID } = require('@typegoose/auto-increment');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const R = require('ramda');

const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  userId: Number, // Added field for auto-increment
  username: String,
  email: String,
  password: String,
  role: { type: String, enum: ['Member', 'Non-Member', 'Admin'] },
  membershipStatus: { type: String, enum: ['Regular', 'Premium', 'None'] },
  membershipExpiry: Date,
  points: Number,
  preselectedPaymentMethod: String,
  // first_name: String, // Uncomment if these fields are required
  // last_name: String,
});

userSchema.plugin(AutoIncrementID, {
  field: 'userId', // Use the correct field name
  incrementBy: 1,
  startAt: 1,
  trackerCollection: 'counters',
  trackerModelName: 'User',
});

// Modify or remove virtual properties if first_name and last_name are not part of your schema
userSchema.virtual('full_name').get(function() {
  if (this.first_name && this.last_name) {
    return `${this.first_name} ${this.last_name}`;
  }
  if (this.first_name && !this.last_name) {
    return this.first_name;
  }
  if (!this.first_name && this.last_name) {
    return this.last_name;
  }
  return undefined;
});

userSchema.virtual('initials').get(function() {
  return this.first_name && this.last_name && `${this.first_name[0].concat(this.last_name[0]).toUpperCase()}`;
});

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.hashPassword = function() {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err1, salt) => {
      if (err1) { reject(err1); }
      bcrypt.hash(this.password, salt, (err2, hash) => {
        if (err2) { reject(err2); }
        this.password = hash;
        resolve(hash);
      });
    });
  });
};

userSchema.methods.hidePassword = function() {
  return R.omit(['password', '_id'], this.toObject({ virtuals: true }));
};

const User = mongoose.model('User', userSchema);

module.exports = User;
