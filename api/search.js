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
      isVerified: true,
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
        { name: { $regex: searchText, $options: 'i' }, isVerified: true },
        { username: { $regex: searchText, $options: 'i' } },
      ],
      isVerified: true,
    });

    users = users.filter((user) => user._id.toString() !== req.userId);

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route:  GET /api/search/advanced/tag/:tag
// @desc:   Get posts with associated tag
router.get('/advanced/tag/:tag', async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Post.countDocuments({ techStack: req.params.tag });

    const posts = await Post.find({ techStack: req.params.tag })
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate('user');

    let next = null;
    if (endIndex < total) {
      next = page + 1;
    }

    res.status(200).json({ posts, next, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route:  GET /api/search/advanced/users/:searchText
// @desc:   Get users related to search text
router.get('/advanced/users/:searchText', async (req, res) => {
  try {
    const { searchText } = req.params;

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await User.countDocuments({
      $or: [
        { name: { $regex: searchText, $options: 'i' } },
        { username: { $regex: searchText, $options: 'i' } },
      ],
      isVerified: true,
    });

    const users = await User.find({
      $or: [
        { name: { $regex: searchText, $options: 'i' } },
        { username: { $regex: searchText, $options: 'i' } },
      ],
      isVerified: true,
    })
      .skip(startIndex)
      .limit(limit);

    let next = null;
    if (endIndex < total) {
      next = page + 1;
    }

    res.status(200).json({ users, next, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route:  GET /api/search/advanced/posts/:searchText
// @desc:   Get posts related to search text
router.get('/advanced/posts/:searchText', async (req, res) => {
  try {
    const { searchText } = req.params;

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Post.countDocuments({
      title: { $regex: searchText, $options: 'i' },
    });

    const posts = await Post.find({
      title: { $regex: searchText, $options: 'i' },
    })
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate('user');

    let next = null;
    if (endIndex < total) {
      next = page + 1;
    }

    res.status(200).json({ posts, next, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
