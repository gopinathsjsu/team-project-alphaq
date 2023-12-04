const express = require('express');
const geolib = require('geolib');
const mongoose = require('mongoose');
const moment = require('moment');

const { Show, Theater } = require('../database/schemas');

const router   = express.Router();

module.exports = router;

function customCompare(a, b) {
  return (a.dist - b.dist);
}

router.get('/getByMovieId/:movieId', async(req, res) => {
  try {

    const { lat, long } = req.query;
    const date = new Date(req.query.date);
    const { movieId } = req.params;

    // Build the query
    const query = {
      movieId,
      date: {
        $gte: date,
        $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000), // Next day
      },
    };

    const showList = await Show.find(query);

    // Grouping by theater
    const groupedShows = showList.reduce((x, y) => {
      (x[y.theaterId] = x[y.theaterId] || []).push(y);
      return x;
    }, {});

    // Extracting keys from groupedShows and sorting for distance
    const theaterList = Object.keys(groupedShows);
    const theaterDataExtract = await Theater.find();
    let theaterData = [...theaterDataExtract];
    theaterData = theaterData.filter((theaterObj) => theaterList.includes(theaterObj._id.toString()));
    if (lat && long) {
      theaterData = await Promise.all(theaterData.map(async(theaterObj) => {
        // eslint-disable-next-line max-len
        const dist = geolib.getDistance({ latitude: lat, longitude: long }, { latitude: theaterObj.lat, longitude: theaterObj.long });
        theaterObj.dist = dist;
        return theaterObj;
      }));
      theaterData.sort(customCompare);
    }
    const response = [];
    theaterData.forEach((theaterObj) => {
      const {
        _id,
        name,
        photo,
        location,
        addressLine1,
        addressLine2,
        city,
        state,
      } = theaterObj;
      const respObj = {
        _id,
        name,
        photo,
        location,
        addressLine1,
        addressLine2,
        city,
        state,
      };
      respObj.showList = [];
      groupedShows[_id].forEach((ele) => {
        respObj.showList.push({
          startTime: ele.startTime,
          endTime: ele.endTime,
          lang: ele.lang,
          screen: ele.screen,
          price: ele.price,
          _id: ele._id,
        });
      });
      response.push(respObj);
    });
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Creating a new show entry
router.post('/', async(req, res) => {
  try {
    const showData = req.body;
    const newShow = await Show.create(showData);
    res.status(201).json(newShow);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all shows
router.get('/', async(req, res) => {
  try {
    const shows = await Show.find();
    res.json(shows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific show by ID
router.get('/:id', async(req, res) => {
  try {
    const showId = req.params.id;
    const show = await Show.findById(showId)
      .populate('movieId')
      .populate('theaterId');

    if (!show) {
      return res.status(404).json({ error: 'Show not found' });
    }

    res.json(show);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Updating a show by its id
router.put('/:id', async(req, res) => {
  try {
    const showId = req.params.id;
    const updatedShowData = req.body;

    const updatedShow = await Show.findByIdAndUpdate(showId, updatedShowData, { new: true });

    if (!updatedShow) {
      return res.status(404).json({ error: 'Show not found' });
    }

    res.json(updatedShow);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a show by ID
router.delete('/:id', async(req, res) => {
  try {
    const showId = req.params.id;
    const deletedShow = await Show.findByIdAndDelete(showId);

    if (!deletedShow) {
      return res.status(404).json({ error: 'Show not found' });
    }

    res.json({ message: 'Show deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
