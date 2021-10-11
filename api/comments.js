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
  newReplyNotification,
  removeReplyNotification,
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

// @route   POST /api/comments/:postId/:commentId
// @desc    Reply to a comment
router.post('/:postId/:commentId', auth, async (req, res) => {
  try {
    if (req.body.text.length < 1) {
      return res
        .status(400)
        .json({ msg: 'Reply must be atleast 1 character long' });
    }

    let post = await Comment.findOne({ post: req.params.postId });
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const reply = {
      _id: uuid(),
      user: req.userId,
      text: req.body.text,
      date: Date.now(),
      likes: [],
    };

    const commentToReply = post.comments.find(
      (comment) => comment._id === req.params.commentId
    );
    commentToReply.replies.push(reply);
    post = await post.save();

    post = await Comment.populate(post, 'comments.user');
    post = await Comment.populate(post, 'comments.replies.user');

    if (commentToReply.user._id.toString() !== req.userId) {
      await newReplyNotification(
        commentToReply.user._id.toString(),
        req.userId,
        req.params.postId,
        reply._id,
        req.body.text
      );
    }

    res.status(201).json(post.comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   DELETE /api/comments/:postId/:commentId/:replyId
// @desc    Delete a reply to comment
router.delete('/:postId/:commentId/:replyId', auth, async (req, res) => {
  try {
    let post = await Comment.findOne({ post: req.params.postId });
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const parentComment = post.comments.find(
      (comment) => comment._id === req.params.commentId
    );
    if (!parentComment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    const reply = parentComment.replies.find(
      (reply) => reply._id === req.params.replyId
    );
    if (!reply) {
      return res.status(404).json({ msg: 'Reply not found' });
    }

    const user = await User.findById(req.userId);

    if (reply.user.toString() === req.userId || user.role === 'root') {
      const index = parentComment.replies.findIndex(
        (reply) => reply._id === req.params.replyId
      );
      parentComment.replies.splice(index, 1);
      post = await post.save();

      post = await Comment.populate(post, 'comments.user');
      post = await Comment.populate(post, 'comments.replies.user');

      if (parentComment.user._id.toString() !== req.userId) {
        await removeReplyNotification(
          parentComment.user._id.toString(),
          req.userId,
          req.params.postId,
          reply._id
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

// @route   PUT /api/comments/like/:postId/:commentId
// @desc    Like or unlike a comment
router.put('/like/:postId/:commentId', auth, async (req, res) => {
  try {
    let post = await Comment.findOne({ post: req.params.postId });
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    let comment = post.comments.find(
      (comment) => comment._id === req.params.commentId
    );
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    const isLiked =
      comment.likes.filter((like) => like.user.toString() === req.userId)
        .length > 0;

    if (isLiked) {
      // Unlike the comment if already liked
      const index = comment.likes.findIndex(
        (like) => like.user.toString() === req.userId
      );
      comment.likes.splice(index, 1);
      post = await post.save();

      post = await Comment.populate(post, 'comments.user');
      post = await Comment.populate(post, 'comments.replies.user');

      res.status(200).json(post.comments);
    } else {
      // Like the comment
      comment.likes.unshift({ user: req.userId });
      post = await post.save();

      post = await Comment.populate(post, 'comments.user');
      post = await Comment.populate(post, 'comments.replies.user');

      res.status(200).json(post.comments);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   PUT /api/comments/like/:postId/:commentId/:replyId
// @desc    Like or unlike a reply
router.put('/like/:postId/:commentId/:replyId', auth, async (req, res) => {
  try {
    let post = await Comment.findOne({ post: req.params.postId });
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    let comment = post.comments.find(
      (comment) => comment._id === req.params.commentId
    );
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    let reply = comment.replies.find(
      (reply) => reply._id === req.params.replyId
    );
    if (!reply) {
      return res.status(404).json({ msg: 'Reply not found' });
    }

    const isLiked =
      reply.likes.filter((like) => like.user.toString() === req.userId).length >
      0;

    if (isLiked) {
      // Unlike the reply if already liked
      const index = reply.likes.findIndex(
        (like) => like.user.toString() === req.userId
      );
      reply.likes.splice(index, 1);
      post = await post.save();

      post = await Comment.populate(post, 'comments.user');
      post = await Comment.populate(post, 'comments.replies.user');

      res.status(200).json(post.comments);
    } else {
      // Like the comment
      reply.likes.unshift({ user: req.userId });
      post = await post.save();

      post = await Comment.populate(post, 'comments.user');
      post = await Comment.populate(post, 'comments.replies.user');

      res.status(200).json(post.comments);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
