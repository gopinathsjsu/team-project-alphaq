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

module.exports = router;
