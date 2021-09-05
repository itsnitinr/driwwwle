import Image from 'next/image';
import { useRouter } from 'next/router';

const ChatItem = ({ chat }) => {
  const router = useRouter();

  const active = router.query.chat === chat.messagesWith;

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
        <Image
          className="rounded-full border"
          src={chat.profilePicUrl}
          height={50}
          width={50}
          alt={chat.name}
        />
        <div className="transform translate-y-0.5 ml-3 text-left">
          <h3 className="leading-4">{chat.name}</h3>
          <span className="text-xs text-gray-500">{chat.lastMessage}</span>
        </div>
      </button>
    </li>
  );
};

export default ChatItem;
