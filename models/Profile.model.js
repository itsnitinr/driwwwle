const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    bio: {
      type: String,
      required: true,
    },
    techStack: {
      type: [String],
    },
    social: {
      github: { type: String },
      website: { type: String },
      linkedin: { type: String },
      twitter: { type: String },
      instagram: { type: String },
      youtube: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Profile', profileSchema);
