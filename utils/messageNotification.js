const messageNotification = (senderName) => {
  const sound = new Audio('/new_message.mp3');
  sound && sound.play();

  if (senderName) {
    document.title = `New message from ${senderName}`;
    if (document.visibilityState === 'visible') {
      setTimeout(() => {
        document.title = 'Your messages | Driwwwle';
      }, 3000);
    }
  }
};

export default messageNotification;
