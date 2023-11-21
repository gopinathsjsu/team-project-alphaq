const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // import User model
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log({ username, email, password } )
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("first")
        const newUser = new User({ username, email, password: hashedPassword });
        console.log(newUser)
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
