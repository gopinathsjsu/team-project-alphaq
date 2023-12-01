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
        console.error(error); // Log the full error for debugging
        res.status(400).send({ 
            message: 'Error creating genre', 
            error: error.message || 'Unknown error' // Send a more detailed error message
        });
    }
});

// GET: Retrieve all genres
router.get('/genres', async (req, res) => {
    try {
        const genres = await Genre.find({});
        res.send(genres);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving genres', error });
    }
});

// GET: Retrieve a single genre by id
router.get('/genres/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) {
            return res.status(404).send({ message: 'Genre not found' });
        }
        res.send(genre);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving genre', error });
    }
});

// PATCH: Update a genre by id
router.patch('/genres/:id', async (req, res) => {
    try {
        const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!genre) {
            return res.status(404).send({ message: 'Genre not found' });
        }
        res.send(genre);
    } catch (error) {
        res.status(400).send({ message: 'Error updating genre', error });
    }
});

// DELETE: Delete a genre by id
router.delete('/genres/:id', async (req, res) => {
    try {
        const genre = await Genre.findByIdAndDelete(req.params.id);
        if (!genre) {
            return res.status(404).send({ message: 'Genre not found' });
        }
        res.send(genre);
    } catch (error) {
        res.status(500).send({ message: 'Error deleting genre', error });
    }
});

module.exports = router;
