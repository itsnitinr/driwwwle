const express = require('express');
const router = express.Router();

const User = require('../models/User.model');
const Notification = require('../models/Notification.model');

const auth = require('../middleware/auth.middleware');

// @route   GET /api/notifications
// @desc    Retreive user's notifications
router.get('/', auth, async (req, res) => {
  try {
    const user = await Notification.findOne({ user: req.userId })
      .populate('notifications.user')
      .populate('notifications.post');

    const notifications = user.notifications.filter(
      (notification) =>
        ((notification.type === 'like' ||
          notification.type === 'comment' ||
          notification.type === 'reply') &&
          notification.user?._id &&
          notification.post?._id) ||
        (notification.type === 'follow' && notification.user?._id) ||
        notification.type === 'badge'
    );

    res.status(200).json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   POST /api/notifications
// @desc    Set notifications to read
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user.unreadNotification) {
      user.unreadNotification = false;
      await user.save();
    }
    res.status(200).json({ msg: 'Updated unread notification status' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
