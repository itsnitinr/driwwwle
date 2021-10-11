const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  comments: [
    {
      _id: { type: String, required: true },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: { type: String, required: true },
      date: { type: Date, default: Date.now },
      likes: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
        },
      ],
      replies: [
        {
          _id: { type: String, required: true },
          user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          text: { type: String, required: true },
          date: { type: Date, default: Date.now },
          likes: [
            {
              user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
              },
            },
          ],
        },
      ],
    },
  ],
});

module.exports = mongoose.model('Comment', commentSchema);
