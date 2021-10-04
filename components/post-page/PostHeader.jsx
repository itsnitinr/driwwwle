import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  HeartIcon,
  BookmarkIcon,
  TrashIcon,
  PencilAltIcon,
} from '@heroicons/react/solid';

import DeleteModal from '../../components/post-page/DeleteModal';

const PostHeader = ({ post, user, deletePost, likePost, savePost }) => {
  const [open, setOpen] = useState(false);

  const isLiked =
    user && post.likes.filter((like) => like.user === user._id).length > 0;

  const isSaved =
    user && post.saves.filter((save) => save.user === user._id).length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Image
          src={post.user.profilePicUrl}
          className="rounded-full object-cover"
          height={50}
          width={50}
        />
        <div className="ml-4">
          <h1 className="text-lg md:text-xl font-semibold">{post.title}</h1>
          <Link href={`/${post.user.username}`}>
            <a className="md:text-md hover:text-pink-600 text-gray-700">
              {post.user.username}
            </a>
          </Link>
        </div>
      </div>
      <div className="flex gap-2 md:gap-4">
        {user && (
          <>
            {post.user._id !== user._id && (
              <button
                onClick={savePost}
                className={`${
                  isSaved
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-700'
                }  py-2 px-3 flex items-center rounded-lg font-medium`}
              >
                <BookmarkIcon className="h-5 w-5 mr-1" />{' '}
                <p className="hidden md:block">{isSaved ? 'Saved' : 'Save'}</p>
              </button>
            )}
            <button
              onClick={likePost}
              className={`${
                isLiked
                  ? 'bg-pink-100 text-pink-600'
                  : 'bg-gray-100 text-gray-700'
              } py-2 px-3 flex items-center rounded-lg font-medium`}
            >
              {isLiked ? (
                <>
                  <HeartIcon className="h-5 w-5 mr-1" />{' '}
                  <p>{post.likes.length}</p>
                </>
              ) : (
                <>
                  <HeartIcon className="h-5 w-5 mr-1" />{' '}
                  <p className="hidden md:block">Like</p>
                </>
              )}
            </button>
            {post.user._id === user._id && (
              <Link href={`/posts/edit/${post._id}`}>
                <a className="bg-blue-100 text-blue-600 py-2 px-3 flex items-center rounded-lg font-medium">
                  <PencilAltIcon className="h-5 w-5" />{' '}
                  <p className="hidden md:block ml-1">Edit</p>
                </a>
              </Link>
            )}
            {(post.user._id === user._id || user.role === 'root') && (
              <button
                onClick={() => setOpen(true)}
                className="bg-red-100 text-red-600 py-2 px-3 flex items-center rounded-lg font-medium"
              >
                <TrashIcon className="h-5 w-5" />{' '}
                <p className="hidden md:block ml-1">Delete</p>
                <DeleteModal
                  open={open}
                  setOpen={setOpen}
                  deletePost={deletePost}
                />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PostHeader;
