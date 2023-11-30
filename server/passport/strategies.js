const LocalStrategy = require('passport-local').Strategy;

const { User } = require('../database/schemas');

const Strategies = module.exports;

Strategies.local = new LocalStrategy((email, password, done) => {
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return done(null, false, { message: 'Username doesn\'t exist' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect username or password' });
      }
      return done(null, user);
    })
    .catch(err => done(err));

});

