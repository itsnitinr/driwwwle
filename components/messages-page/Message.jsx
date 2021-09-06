const Message = ({ message, user, setMessages, messagesWith }) => {
  const isUserSender = message.sender === user._id;

  return (
    <div className={`${isUserSender ? 'ml-auto' : 'mr-auto'} w-max max-w-1/2`}>
      <div
        className={`${
          isUserSender
            ? 'bg-pink-300 rounded-tr-none'
            : 'bg-pink-400 rounded-tl-none'
        } rounded-lg py-2 font-medium px-4 text-left`}
      >
        {message.message}
      </div>
      <p className="text-xs text-gray-400">{message.date}</p>
    </div>
  );
};

export default Message;
