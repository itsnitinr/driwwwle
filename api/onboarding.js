const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/User.model');
const Profile = require('../models/Profile.model');
const Follower = require('../models/Follower.model');

// @route:  POST /api/onboarding/:token
// @desc:   Verify email and complete onboarding
router.post('/:token', async (req, res) => {
  const { token } = req.params;
  const {
    bio,
    techStack,
    social: { github, linkedin, website, twitter, instagram, youtube },
    profilePicUrl,
  } = req.body;

  const verificationToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  try {
    // Find user with specific verification token
    const user = await User.findOne({ verificationToken });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid or expired token' });
    }

    // Set user verified to true
    user.isVerified = true;
    user.verificationToken = undefined;
    if (profilePicUrl) user.profilePicUrl = profilePicUrl;
    await user.save();

    // Create profile
    let profileFields = {};
    profileFields.user = user._id;
    profileFields.bio = bio;
    profileFields.techStack = techStack;

    profileFields.social = {};
    if (github) profileFields.social.github = github;
    if (website) profileFields.social.website = website;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (youtube) profileFields.social.youtube = youtube;

    await new Profile(profileFields).save();

    // Initialise followers and following
    await new Follower({ user: user._id, followers: [], following: [] }).save();

    // Return JWT
    jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '2d' },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          msg: 'User verified and onboarded',
          token,
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
