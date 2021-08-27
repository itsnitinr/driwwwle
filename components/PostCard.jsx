import Link from 'next/link';
import Image from 'next/image';
import { EyeIcon, HeartIcon } from '@heroicons/react/solid';

const PostCard = ({ post }) => {
  return (
    <Link href={`/posts/${post._id}`}>
      <div className="rounded-lg relative group">
        <Image
          src={post.images[0]}
          alt={post.name}
          width={375}
          height={225}
          className="rounded-lg hover:brightness-50 transition cursor-pointer"
        />
        <p className="absolute opacity-0 group-hover:opacity-100 transition text-white bottom-12 left-4 font-medium cursor-pointer">
          {post.title.length > 20
            ? post.title.substring(0, 20) + '...'
            : post.title}
        </p>
        <div className="flex justify-between items-center px-1">
          <div className="flex">
            <Image
              src={post.user.profilePicUrl}
              alt={post.user.name}
              className="rounded-full"
              width={25}
              height={20}
            />
            <p className="ml-2">{post.user.username}</p>
          </div>
          <div className="flex items-center text-sm">
            <div className="flex items-center">
              <HeartIcon className="h-4 w-4 mr-1 text-gray-400 hover:text-pink-600 transition" />{' '}
              <p>{post.likes.length}</p>
            </div>
            <div className="flex items-center ml-3">
              <EyeIcon className="h-4 w-4 mr-1 text-gray-400 hover:text-pink-600 transition" />{' '}
              <p>{post.views}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
