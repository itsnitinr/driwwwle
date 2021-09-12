const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/User.model');

const auth = require('../middleware/auth.middleware');
const upload = require('../middleware/imageUpload.middleware');

// @route:  GET /api/auth
// @desc:   Get logged in user's info
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(400).json({
        msg: 'Please verify your email and complete onboarding first',
      });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

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

// @route:  PUT /api/auth
// @desc:   Update user settings
router.put('/', auth, upload.single('profilePic'), async (req, res) => {
  try {
    const { name, username } = req.body;

    // Check if username is already taken
    let user = await User.findOne({ username: username.toLowerCase() });
    if (user && user._id.toString() !== req.userId) {
      return res.status(400).json({ msg: 'Username is already taken' });
    }

    const updatedUser = {};
    if (name) updatedUser.name = name;
    if (username) updatedUser.username = username;
    if (req.file && req.file.path) updatedUser.profilePicUrl = req.file.path;

    user = await User.findByIdAndUpdate(req.userId, updatedUser, { new: true });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route:  PUT /api/auth/password
// @desc:   Update password
router.put('/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.userId).select('+password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check if current password matches
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Incorrect password' });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ msg: 'Password must be atleast 6 characters long' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ msg: 'Password updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
