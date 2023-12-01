const path = require('path');

const express = require('express');

const auth         = require('./auth');
const todos        = require('./todos');
const user         = require('./user');
const movie        = require('./movie');
const genre        = require('./genre');
const theater        = require('./theater');
const showtime        = require('./showtime');
const movieRoute        = require('./movieRoute');
const shows        = require('./showRoute');
const users        = require('./users');

const router = express.Router();

router.use('/api/auth', auth);
router.use('/api/todos', todos);
router.use('/api/user', user);
router.use('/api/movie', movie);
router.use('/api/genre', genre);
router.use('/api/theater', theater);
router.use('/api/showtime', showtime);
router.use('/api/movieRoute', movieRoute);
router.use('/api/', shows);
router.use('/api/users', users);

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
