const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');

const { User } = require('../database/schemas');

const { requireAuth } = require('./middleware');

const router   = express.Router();

module.exports = router;

router.post('/login', async(req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Check password
    const passwordMatch = await bcrypt.compareSync(password.trim(), user.password.trim());

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

    res.json({ userInfo: user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

