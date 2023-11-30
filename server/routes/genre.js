const express = require('express');
const { Genre } = require('../database/schemas'); // Update this path to where your Genre model is located

const router = express.Router();

// POST: Create a new genre
router.post('/genres', async (req, res) => {
    try {
        const genre = new Genre(req.body);
        await genre.save();
        res.status(201).send(genre);
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET: Retrieve all genres
router.get('/genres', async (req, res) => {
    try {
        const genres = await Genre.find({});
        res.send(genres);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET: Retrieve a single genre by id
router.get('/genres/:id', async (req, res) => {
    console.log(req.params.id)
    try {
        const genre = await Genre.findById(req.params.id);
        console.log(genre)
        if (!genre) {
            return res.status(404).send();
        }
        res.send(genre);
    } catch (error) {
        res.status(500).send(error);
    }
});

// PATCH: Update a genre by id
router.patch('/genre/:id', async (req, res) => {
    try {
        const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!genre) {
            return res.status(404).send();
        }
        res.send(genre);
    } catch (error) {
        res.status(400).send(error);
    }
});

// DELETE: Delete a genre by id
router.delete('/genres/:id', async (req, res) => {
    try {
        const genre = await Genre.findByIdAndDelete(req.params.id);
        if (!genre) {
            return res.status(404).send();
        }
        res.send(genre);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
