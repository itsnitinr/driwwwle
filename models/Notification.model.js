const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  notifications: [
    {
      type: {
        type: 'String',
        enum: ['like', 'comment', 'follow', 'badge', 'reply'],
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
      commentId: {
        type: String,
      },
      text: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

module.exports = mongoose.model('Notification', notificationSchema);
