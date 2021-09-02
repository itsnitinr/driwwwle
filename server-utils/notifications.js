const User = require('../models/User.model');
const Notification = require('../models/Notification.model');

const setNotificationsToUnread = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user.unreadNotification) {
      user.unreadNotification = true;
    }
  } catch (error) {
    console.error(error);
  }
};

const newLikeNotification = async (userToNotifyId, userWhoLikedId, postId) => {
  try {
    const userToNofify = await Notification.findOne({ user: userToNotifyId });
    const notification = {
      type: 'like',
      user: userWhoLikedId,
      post: postId,
      date: Date.now(),
    };

    userToNofify.notifications.unshift(notification);
    await userToNofify.save();

    await setNotificationsToUnread(userToNotifyId);
  } catch (error) {
    console.error(error);
  }
};

const removeLikeNotification = async (
  userToNotifyId,
  userWhoLikedId,
  postId
) => {
  try {
    await Notification.findOneAndUpdate(
      { user: userToNotifyId },
      {
        $pull: {
          notifications: {
            type: 'like',
            user: userWhoLikedId,
            post: postId,
          },
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = { newLikeNotification, removeLikeNotification };
