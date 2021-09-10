import { format } from 'date-fns';

const Message = ({ message, user, divRef }) => {
  const isUserSender = message.sender === user._id;

  return (
    <div
      className={`${
        isUserSender ? 'ml-auto' : 'mr-auto'
      } w-max max-w-xs md:max-w-xs lg:max-w-md xl:max-w-lg mb-2`}
      ref={divRef}
    >
      <div
        className={`${
          isUserSender
            ? 'bg-pink-300 rounded-tr-none'
            : 'bg-pink-400 rounded-tl-none'
        } rounded-lg py-2 mb-1 font-medium px-4 text-left`}
      >
        <p className="break-words">{message.message}</p>
      </div>
      <p
        className={`text-xs text-gray-400 ${
          isUserSender ? 'text-right' : 'text-left'
        }`}
      >
        {format(new Date(message.date), 'd MMM, hh:mm a')}
      </p>
    </div>
  );
};

export default Message;
