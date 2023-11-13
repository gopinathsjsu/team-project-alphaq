const express = require('express');
const router = express.Router();
const { Genre } = require('../database/schemas');

// CRUD Operations
router.post('/', async (req, res) => {
    try {
        const newGenre = new Genre(req.body);
        await newGenre.save();
        res.status(201).json(newGenre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find();
        res.json(genres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:name', async (req, res) => {
    try {
        const genre = await Genre.findOne({ name: req.params.name });
        if (!genre) return res.status(404).json({ message: 'Genre not found' });
        res.json(genre);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;
