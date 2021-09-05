const express = require('express');
const router = express.Router();

const User = require('../models/User.model');
const Post = require('../models/Post.model');

router.get('/:searchText', async (req, res) => {
  const { searchText } = req.params;
  if (searchText.trim().length === 0) {
    return res.status(400).json({ msg: 'Search text too short' });
  }

  try {
    const users = await User.find({
      $or: [
        { name: { $regex: searchText, $options: 'i' } },
        { username: { $regex: searchText, $options: 'i' } },
      ],
    });

    const posts = await Post.find({
      title: { $regex: searchText, $options: 'i' },
    }).populate('user');

    res.status(200).json({ users, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
