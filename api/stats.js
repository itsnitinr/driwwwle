const express = require('express');
const router = express.Router();

const Profile = require('../models/Profile.model');
const Post = require('../models/Post.model');

router.get('/', async (req, res) => {
  try {
    const users = await Profile.countDocuments();
    const posts = await Post.countDocuments();
    res.status(200).json({ users, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
