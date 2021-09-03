const express = require('express');
const router = express.Router();

const Notification = require('../models/Notification.model');

const auth = require('../middleware/auth.middleware');

// @route   GET /api/notifications
// @desc    Retreive user's notifications
router.get('/', auth, async (req, res) => {
  try {
    const user = await Notification.findOne({ user: req.userId })
      .populate('notifications.user')
      .populate('notifications.post');

    res.status(200).json(user.notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
