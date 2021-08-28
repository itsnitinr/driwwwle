import Image from 'next/image';
import { HeartIcon, BookmarkIcon, TrashIcon } from '@heroicons/react/solid';

const PostHeader = ({ post, user, deletePost }) => {
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
          <h1 className="text-lg md:text-xl font-semibold leading-6">
            {post.title}
          </h1>
          <p className="md:text-md text-gray-500">@{post.user.username} </p>
        </div>
      </div>
      <div className="flex gap-2 md:gap-4">
        {user && (
          <>
            <button className="bg-gray-100 text-gray-700 py-2 px-3 flex items-center rounded-lg font-medium">
              <BookmarkIcon className="h-5 w-5 mr-1" />{' '}
              <p className="hidden md:block">Save</p>
            </button>
            <button className="bg-gray-100 text-gray-700 py-2 px-3 flex items-center rounded-lg font-medium">
              <HeartIcon className="h-5 w-5 mr-1" />{' '}
              <p className="hidden md:block">Like</p>
            </button>
            {post.user._id === user._id && (
              <button
                onClick={deletePost}
                className="bg-red-100 text-red-600 py-2 px-3 flex items-center rounded-lg font-medium"
              >
                <TrashIcon className="h-5 w-5 mr-1" />{' '}
                <p className="hidden md:block">Delete</p>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PostHeader;
