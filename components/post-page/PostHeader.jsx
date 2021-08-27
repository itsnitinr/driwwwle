import Image from 'next/image';
import { HeartIcon, BookmarkIcon } from '@heroicons/react/solid';

const PostHeader = ({ post, user }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Image
          src={post.user.profilePicUrl}
          className="rounded-full"
          height={50}
          width={50}
        />
        <div className="ml-4">
          <h1 className="text-lg font-semibold leading-6">{post.user.name}</h1>
          <p className="text-md text-gray-500">@{post.user.username} </p>
        </div>
      </div>
      <div className="flex gap-2 md:gap-4">
        {user && (
          <>
            <div className="bg-gray-100 text-gray-700 py-2 px-3 flex items-center rounded-lg font-medium">
              <BookmarkIcon className="h-5 w-5 mr-1" />{' '}
              <p className="hidden md:block">Save</p>
            </div>
            <div className="bg-gray-100 text-gray-700 py-2 px-3 flex items-center rounded-lg font-medium">
              <HeartIcon className="h-5 w-5 mr-1" />{' '}
              <p className="hidden md:block">Like</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostHeader;
