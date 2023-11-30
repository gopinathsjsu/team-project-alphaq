const MongoStore = require('connect-mongo');
const session = require('express-session');
const passport = require('passport');
const uuid = require('uuid');
const LocalStrategy = require('passport-local').Strategy;

const { User } = require('../database/schemas');
const Strategies = require('./strategies');

module.exports = app => {
    // Session configuration
    const sessionConfig = {
        store: MongoStore.create({
            mongoUrl: process.env.DATABASE_URL,
            collectionName: 'sessions',
        }),
        genid: () => uuid.v4(),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    };

    // Initialize session
    app.use(session(sessionConfig));
    app.use(passport.initialize());
    app.use(passport.session());

    // Serialize user
    passport.serializeUser((user, done) => done(null, user.id));

    // Deserialize user
    passport.deserializeUser((id, done) => {
        User.findById({ _id: id })
            .then(user => done(null, user))
            .catch(err => console.warn(`err at deserialize: ${err}`));
    });

    // Assuming Strategies.local is properly set
    passport.use(Strategies.local);

    // Passport LocalStrategy setup with async/await
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));
};
