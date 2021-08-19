const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/User.model');

// @route:  POST /api/auth
// @desc:   Login user
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (password.length < 6) {
    return res
      .status(400)
      .json({ msg: 'Password must be atleast 6 characters long' });
  }

  try {
    // Check if user is registered
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      '+password'
    );
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res
        .status(400)
        .json({ msg: 'Please verify your email before trying to log in' });
    }

    // Check if password is correct
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Sign JWT and return token
    jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '2d' },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
