const uuid = require('uuid').v4;
const express = require('express');
const router = express.Router();

const User = require('../models/User.model');
const Post = require('../models/Post.model');
const Comment = require('../models/Comment.model');

const auth = require('../middleware/auth.middleware');

const {
  newCommentNotification,
  removeCommentNotification,
} = require('../server-utils/notifications');

// @route   GET /api/comments/:postId
// @desc    Get comments on a post
router.get('/:postId', async (req, res) => {
  try {
    const post = await Comment.findOne({ post: req.params.postId })
      .populate('comments.user')
      .populate('comments.replies.user');

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.status(200).json(post.comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   POST /api/comments/:postId
// @desc    Add a new comment to post
router.post('/:postId', auth, async (req, res) => {
  try {
    if (req.body.text.length < 1) {
      return res
        .status(400)
        .json({ msg: 'Comment must be atleast 1 character long' });
    }

    let post = await Comment.findOne({ post: req.params.postId });
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const comment = {
      _id: uuid(),
      user: req.userId,
      text: req.body.text,
      date: Date.now(),
      likes: [],
      replies: [],
    };

    post.comments.unshift(comment);
    post = await post.save();

    post = await Comment.populate(post, 'comments.user');
    post = await Comment.populate(post, 'comments.replies.user');

    const postInfo = await Post.findById(req.params.postId);

    if (postInfo.user.toString() !== req.userId) {
      await newCommentNotification(
        postInfo.user.toString(),
        req.userId,
        req.params.postId,
        comment._id,
        req.body.text
      );
    }

    res.status(201).json(post.comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   DELETE /api/comments/:postId/:commentId
// @desc    Delete a comment
router.delete('/:postId/:commentId', auth, async (req, res) => {
  try {
    let post = await Comment.findOne({ post: req.params.postId });
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const comment = post.comments.find(
      (comment) => comment._id === req.params.commentId
    );
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    const user = await User.findById(req.userId);

    if (comment.user.toString() === req.userId || user.role === 'root') {
      const index = post.comments.findIndex(
        (comment) => comment._id === req.params.commentId
      );
      post.comments.splice(index, 1);
      post = await post.save();

      post = await Comment.populate(post, 'comments.user');
      post = await Comment.populate(post, 'comments.replies.user');

      const postInfo = await Post.findById(req.params.postId);

      if (postInfo.user.toString() !== req.userId) {
        await removeCommentNotification(
          postInfo.user.toString(),
          req.userId,
          req.params.postId,
          comment._id
        );
      }

      res.status(200).json(post.comments);
    } else {
      res
        .status(401)
        .json({ msg: 'You are not authorized to delete this comment' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
