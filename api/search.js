const express = require('express');
const router = express.Router();

const User = require('../models/User.model');
const Post = require('../models/Post.model');

const auth = require('../middleware/auth.middleware');

// @route:  GET /api/search/:searchText
// @desc:   Get users and posts related to search text
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
    }).limit(3);

    const posts = await Post.find({
      title: { $regex: searchText, $options: 'i' },
    })
      .populate('user')
      .limit(3);

    res.status(200).json({ users, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route:  GET /api/search/users/:searchText
// @desc:   Get users related to search text
router.get('/users/:searchText', auth, async (req, res) => {
  const { searchText } = req.params;
  if (searchText.trim().length === 0) {
    return res.status(400).json({ msg: 'Search text too short' });
  }

  try {
    let users = await User.find({
      $or: [
        { name: { $regex: searchText, $options: 'i' } },
        { username: { $regex: searchText, $options: 'i' } },
      ],
    });

    users = users.filter((user) => user._id.toString() !== req.userId);

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
