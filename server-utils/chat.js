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

const sendMessage = async (userId, receiverId, message) => {
  try {
    const user = await Chat.findOne({ user: userId });
    const receiver = await Chat.findOne({ user: receiverId });

    const newMessage = {
      sender: userId,
      receiver: receiverId,
      message,
      date: Date.now(),
    };

    await addChat(user, receiverId, newMessage);
    await addChat(receiver, userId, newMessage);

    return { newMessage };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

const addChat = async (user, receiverId, newMessage) => {
  const previousChat = user.chats.find(
    (chat) => chat.messagesWith.toString() === receiverId
  );

  if (previousChat) {
    previousChat.messages.push(newMessage);
    await user.save();
  } else {
    const newChat = {
      messagesWith: receiverId,
      messages: [newMessage],
    };
    user.chats.unshift(newChat);
    await user.save();
  }
};

module.exports = { loadMessages, sendMessage };
