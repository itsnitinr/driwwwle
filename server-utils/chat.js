const Chat = require('../models/Chat.model');

const loadMessages = async (userId, messagesWith) => {
  try {
    const user = await Chat.findOne({ user: userId }).populate(
      'chats.messagesWith'
    );

    const chat = user.chats.find(
      (chat) => chat.messagesWith._id.toString() === messagesWith
    );

    if (!chat) {
      return { error: 'Chat not found' };
    }

    return { chat };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

module.exports = { loadMessages };
