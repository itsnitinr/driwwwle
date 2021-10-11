import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNowStrict } from 'date-fns';
import { ChatAltIcon, HeartIcon, UserAddIcon } from '@heroicons/react/solid';
import { BiAward } from 'react-icons/bi';

const NotificationItem = ({ notification, index, length }) => {
  return (
    <li>
      <div className="relative pb-8">
        {index !== length - 1 ? (
          <span
            className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
            aria-hidden="true"
          />
        ) : null}
        <div className="relative flex items-start space-x-3">
          {notification.type === 'comment' ? (
            <>
              <Link href={`/${notification.user.username}`}>
                <div className="relative cursor-pointer">
                  <Image
                    className="rounded-full flex items-center justify-center ring-8 ring-white object-cover"
                    src={notification.user.profilePicUrl}
                    width={40}
                    height={40}
                  />
                  <span className="absolute -bottom-0.5 rounded-full -right-1 bg-pink-600 p-0.5">
                    <ChatAltIcon
                      className="h-3 w-3 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
              <div className="min-w-0 flex justify-between w-full">
                <div className="md:ml-2 ml-0">
                  <div className="text-md text-gray-500">
                    <Link href={`/${notification.user.username}`}>
                      <a className="font-medium text-gray-900 hover:text-pink-600">
                        {notification.user.username}
                      </a>
                    </Link>{' '}
                    left a comment on{' '}
                    <Link href={`/posts/${notification.post._id}`}>
                      <a className="hover:text-pink-600 cursor-pointer">
                        {notification.post.title}
                      </a>
                    </Link>
                  </div>
                  <p className="mt-1 text-gray-900">{notification.text}</p>
                </div>
                <p className="text-gray-500 ml-2 text-sm">
                  {formatDistanceToNowStrict(new Date(notification.date), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </>
          ) : notification.type === 'reply' ? (
            <>
              <Link href={`/${notification.user.username}`}>
                <div className="relative cursor-pointer">
                  <Image
                    className="rounded-full flex items-center justify-center ring-8 ring-white object-cover"
                    src={notification.user.profilePicUrl}
                    width={40}
                    height={40}
                  />
                  <span className="absolute -bottom-0.5 rounded-full -right-1 bg-pink-600 p-0.5">
                    <ChatAltIcon
                      className="h-3 w-3 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
              <div className="min-w-0 flex justify-between w-full">
                <div className="md:ml-2 ml-0">
                  <div className="text-md text-gray-500">
                    <Link href={`/${notification.user.username}`}>
                      <a className="font-medium text-gray-900 hover:text-pink-600">
                        {notification.user.username}
                      </a>
                    </Link>{' '}
                    replied to your comment on{' '}
                    <Link href={`/posts/${notification.post._id}`}>
                      <a className="hover:text-pink-600 cursor-pointer">
                        {notification.post.title}
                      </a>
                    </Link>
                  </div>
                  <p className="mt-1 text-gray-900">{notification.text}</p>
                </div>
                <p className="text-gray-500 ml-2 text-sm">
                  {formatDistanceToNowStrict(new Date(notification.date), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </>
          ) : notification.type === 'follow' ? (
            <>
              <Link href={`/${notification.user.username}`}>
                <div className="relative cursor-pointer">
                  <Image
                    className="rounded-full flex items-center justify-center ring-8 ring-white object-cover"
                    src={notification.user.profilePicUrl}
                    width={40}
                    height={40}
                  />
                  <span className="absolute -bottom-0.5 rounded-full -right-1 bg-pink-600 p-0.5">
                    <UserAddIcon
                      className="h-3 w-3 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
              <div className="min-w-0 w-full flex justify-between py-1.5">
                <div className="text-md text-gray-500 md:ml-2 ml-0">
                  <Link href={`/${notification.user.username}`}>
                    <a className="font-medium text-gray-900 hover:text-pink-600">
                      {notification.user.username}
                    </a>
                  </Link>{' '}
                  started following you
                </div>
                <p className="text-gray-700 ml-2 text-sm">
                  {formatDistanceToNowStrict(new Date(notification.date), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </>
          ) : notification.type === 'like' ? (
            <>
              <Link href={`/${notification.user.username}`}>
                <div className="relative cursor-pointer">
                  <Image
                    className="rounded-full flex items-center justify-center ring-8 ring-white object-cover"
                    src={notification.user.profilePicUrl}
                    width={40}
                    height={40}
                  />
                  <span className="absolute -bottom-0.5 rounded-full -right-1 bg-pink-600 p-0.5">
                    <HeartIcon
                      className="h-3 w-3 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
              <div className="min-w-0 w-full flex justify-between py-1.5">
                <div className="text-md text-gray-500 md:ml-2 ml-0">
                  <Link href={`/${notification.user.username}`}>
                    <a className="font-medium text-gray-900 hover:text-pink-600">
                      {notification.user.username}
                    </a>
                  </Link>{' '}
                  liked your post on{' '}
                  <Link href={`/posts/${notification.post._id}`}>
                    <a className="hover:text-pink-600 cursor-pointer">
                      {notification.post.title}
                    </a>
                  </Link>
                </div>
                <p className="text-gray-700 ml-2 text-sm">
                  {formatDistanceToNowStrict(new Date(notification.date), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </>
          ) : notification.type === 'badge' ? (
            <>
              <Link href="/driwwwle">
                <div className="relative cursor-pointer">
                  <Image
                    className="rounded-full flex items-center justify-center ring-8 ring-white object-cover"
                    src="https://res.cloudinary.com/nitinr/image/upload/v1631657391/driwwwle/atjmp5lij1wy2ox4pnsc.png"
                    width={40}
                    height={40}
                  />
                  <span className="absolute -bottom-0.5 rounded-full -right-1 bg-pink-600 p-0.5">
                    <BiAward
                      className="h-3 w-3 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
              <div className="min-w-0 w-full flex justify-between py-1.5">
                <div className="text-md text-gray-500 md:ml-2 ml-0">
                  You have been awarded the{' '}
                  <span className="font-medium text-gray-900">
                    {notification.text} badge
                  </span>
                  .
                </div>
                <p className="text-gray-700 ml-2 text-sm">
                  {formatDistanceToNowStrict(new Date(notification.date), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </li>
  );
};

export default NotificationItem;
