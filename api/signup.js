const path = require('path');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const handlebars = require('handlebars');
const router = express.Router();

const User = require('../models/User.model');

const sendEmail = require('../server-utils/sendEmail');
const readHTML = require('../server-utils/readHTML');

const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

// @route:  GET /api/signup
// @desc:   Check if the username is taken or not
router.get('/:username', async (req, res) => {
  const { username } = req.params;

  try {
    //Invalid if username is less than 1 char
    if (username.length < 1) {
      return res.status(400).json({ msg: 'Invalid username' });
    }

    // Check if username matches regex conditions
    if (!usernameRegex.test(username)) {
      return res.status(400).json({ msg: 'Invalid username' });
    }

    // Check if username is taken
    const user = await User.findOne({ username: username.toLowerCase() });
    if (user) {
      return res.status(400).json({ msg: 'Username is already taken' });
    }

    res.status(200).json({ msg: 'Username available' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route:  POST /api/signup
// @desc:   Register a new user
router.post('/', async (req, res) => {
  const { name, username, email, password } = req.body;

  if (password.length < 6) {
    return res
      .status(400)
      .json({ msg: 'Password must be atleast 6 characters long' });
  }

  try {
    // Check if user is already registered
    let user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      return res.status(400).json({ msg: 'You are already registered' });
    }

    // Check if username is already taken
    user = await User.findOne({ username: username.toLowerCase() });
    if (user) {
      return res.status(400).json({ msg: 'Username is already taken' });
    }

    user = new User({
      name,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password,
    });

    // Hash the password
    user.password = await bcrypt.hash(password, 10);

    // Send verification email
    const verificationToken = crypto.randomBytes(20).toString('hex');
    user.verificationToken = crypto
      .createHash('sha256')
      .update(verificationToken)
      .digest('hex');

    const verificationUrl = `${req.protocol}://${req.get(
      'host'
    )}/onboarding/${verificationToken}`;

    const htmlTemplate = await readHTML(
      path.join(__dirname, '..', 'emails', 'verify-email.html')
    );
    const handlebarsTemplate = handlebars.compile(htmlTemplate);
    const replacements = { verificationUrl };
    const html = handlebarsTemplate(replacements);

    try {
      await sendEmail({
        to: user.email,
        subject: 'Driwwwle - Account Verification',
        html,
      });
    } catch (err) {
      console.log(err);
      user.verificationToken = undefined;
      await user.save();
      return res.status(500).json({ msg: 'Error sending verification email' });
    }

    await user.save();

    // Sign JWT and return token
    jwt.sign({ userId: user._id }, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err;
      res.status(200).json({
        msg: 'Please check your email to verify your registration',
        token,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
