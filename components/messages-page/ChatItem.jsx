import Image from 'next/image';
import { format } from 'date-fns';
import { useRouter } from 'next/router';

const ChatItem = ({ chat, connectedUsers }) => {
  const router = useRouter();

  const active = router.query.chat === chat.messagesWith;

  const isOnline =
    connectedUsers.length > 0 &&
    connectedUsers.filter((user) => user.userId === chat.messagesWith).length >
      0;

  return (
    <li
      key={chat.messagesWith}
      onClick={() =>
        router.push(`/messages?chat=${chat.messagesWith}`, undefined, {
          shallow: true,
        })
      }
      className={active ? 'bg-gray-100' : null}
    >
      <button className="flex items-center w-full px-4 py-2 select-none hover:bg-gray-100 focus:outline-none">
        <div className="relative">
          <Image
            className="rounded-full border object-cover"
            src={chat.profilePicUrl}
            height={50}
            width={50}
            alt={chat.name}
          />
          <div
            className={`absolute bottom-1.5 right-0 rounded-full h-4 w-4 border-2 border-white ${
              isOnline ? 'bg-green-400' : 'bg-gray-400'
            }`}
          ></div>
        </div>
        <div className="transform translate-y-0.5 ml-3 text-left">
          <h3 className="leading-4">
            {chat.name}{' '}
            <span className="text-xs text-gray-400">
              {format(new Date(chat.date), 'dd MMM, hh:mm a')}
            </span>
          </h3>
          <span className="text-xs text-gray-500">
            {chat.lastMessage.length > 30
              ? chat.lastMessage.substring(0, 30) + '...'
              : chat.lastMessage}
          </span>
        </div>
      </button>
    </li>
  );
};

export default ChatItem;
