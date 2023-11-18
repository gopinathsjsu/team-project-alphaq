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

router.post('/signup', async(req, res) => {
  try {
    const {
      firstName, lastName, email, password, preferenceGenres,
    } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      preferenceGenres,
      rewardPoints: 0,
      isPremium: false,
    });

    await user.save();

    // Generate token
    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

    res.json({ userInfo: user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/validateToken', requireAuth, async(req, res) => {
  try {
    const { userId } = req;
    // Fetch user details if needed
    const user = await User.findById(userId);

    res.json({ userInfo: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Premium membership
router.put('/subscribe', requireAuth, async(req, res) => {
  try {
    const { userId } = req;
    const updatedSubscription = {
      isPremium: true,
    };
    const updatedUserData = await User.findByIdAndUpdate(userId, updatedSubscription, { new: true });

    if (!updatedUserData) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUserData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
