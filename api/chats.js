const express = require('express');
const router = express.Router();

const Chat = require('../models/Chat.model');
const auth = require('../middleware/auth.middleware');

// @route:  GET /api/chats
// @desc:   Retreive user's chats
router.get('/', auth, async (req, res) => {
  try {
    const user = await Chat.findOne({ user: req.userId }).populate(
      'chats.messagesWith'
    );

    const chatsToSend =
      user.chats.length > 0
        ? user.chats.map((chat) => ({
            messagesWith: chat.messagesWith._id,
            name: chat.messagesWith.name,
            profilePicUrl: chat.messagesWith.profilePicUrl,
            lastMessage: chat.messages[chat.messages.length - 1].message,
            date: chat.messages[chat.messages.length - 1].date,
          }))
        : [];

    res.status(200).json(chatsToSend);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
