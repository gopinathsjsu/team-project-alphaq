const path = require('path');

const express = require('express');

const movie   = require('./movie');
const show = require('./show');
const theater  = require('./theater');
const user    = require('./user');
const booking    = require('./booking');
const genre    = require('./genre');

const router = express.Router();

router.use('/api/users', user);
router.use('/api/movie', movie);
router.use('/api/shows', show);
router.use('/api/theaters', theater);
router.use('/api/bookings', booking);
router.use('/api/genres', genre);

router.get('/api/tags', (req, res) => {
  res.send([
    'MERN', 'Node', 'Express', 'Webpack', 'React', 'Redux', 'Mongoose',
    'Bulma', 'Fontawesome', 'Ramda', 'ESLint', 'Jest',
  ]);
});

router.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
});

module.exports = router;
