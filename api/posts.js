const express = require('express');
const router = express.Router();

const Post = require('../models/Post.model');
const User = require('../models/User.model');

const auth = require('../middleware/auth.middleware');

// @route   POST /api/posts
// @desc    Create a new post
router.post('/', auth, async (req, res) => {
  const { title, description, images, liveDemo, sourceCode, techStack } =
    req.body;

  console.log('Entered');

  try {
    const postObj = {
      user: req.userId,
      title,
      description,
      images,
      liveDemo,
      techStack,
    };
    if (sourceCode) postObj.sourceCode = sourceCode;
    const post = await new Post(postObj).save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET /api/posts
// @desc    Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('user');
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET /api/posts/:postId
// @desc    Get a post by ID
router.get('/:postId', async (req, res) => {
  try {
    let post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    post.views++;
    post = await post.save();
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   DELETE /api/posts/:postId
// @desc    Delete a post by ID
router.delete('/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    const user = await User.findById(req.userId);
    if (post.user.toString() === req.userId || user.role === 'root') {
      await post.remove();
      res.status(200).json({ msg: 'Post deleted' });
    } else {
      res
        .status(401)
        .json({ msg: 'You are not authorized to delete this post' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   PUT /api/posts/like/:postId
// @desc    Like or unlike a post
router.put('/like/:postId', auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const isLiked =
      post.likes.filter((like) => like.user.toString() === req.userId).length >
      0;

    if (isLiked) {
      // Unlike the post if already liked
      const index = post.likes.findIndex(
        (like) => like.user.toString() === req.userId
      );
      post.likes.splice(index, 1);
      post = await post.save();
      res.status(200).json(post);
    } else {
      // Like the post
      post.likes.unshift({ user: req.userId });
      post = await post.save();
      res.status(200).json(post);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET /api/posts/like/:postId
// @desc    Get likes of a post
router.get('/like/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate('likes.user');
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(200).json(post.likes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
