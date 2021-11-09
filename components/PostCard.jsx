import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import cookie from 'js-cookie';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from 'react-query';
import { EyeIcon, HeartIcon, BookmarkIcon } from '@heroicons/react/solid';

import baseURL from '../utils/baseURL';

const PostCard = ({ post, user }) => {
  const [isLiked, setIsLiked] = useState(
    () => user && post.likes.filter((like) => like.user === user._id).length > 0
  );

  const [isSaved, setIsSaved] = useState(
    () => user && post.saves.filter((save) => save.user === user._id).length > 0
  );

  const likeMutation = useMutation(
    async () => {
      const { data } = await axios.put(
        `${baseURL}/api/posts/like/${post._id}`,
        {},
        {
          headers: {
            Authorization: cookie.get('token'),
          },
        }
      );
      return data;
    },
    {
      onMutate: () => setIsLiked((prevState) => !prevState),
      onError: () => setIsLiked((prevState) => !prevState),
    }
  );

  const saveMutation = useMutation(
    async () => {
      const { data } = await axios.put(
        `${baseURL}/api/posts/save/${post._id}`,
        {},
        {
          headers: {
            Authorization: cookie.get('token'),
          },
        }
      );
      return data;
    },
    {
      onMutate: () => setIsSaved((prevState) => !prevState),
      onError: () => setIsSaved((prevState) => !prevState),
    }
  );

  return (
    <Link href={`/posts/${post._id}`} className="z-40">
      <motion.div layout>
        <div className="rounded-lg group relative">
          <Image
            src={post.images[0]}
            alt={post.name}
            width={600}
            height={338}
            className="rounded-lg group-hover:brightness-50 transition cursor-pointer object-cover object-top"
          />
          <p className="absolute opacity-0 group-hover:opacity-100 transition text-white bottom-6 left-4 font-medium cursor-pointer">
            {post.title.length > 20
              ? post.title.substring(0, 20) + '...'
              : post.title}
          </p>
          {user && (
            <div className="flex absolute bottom-6 right-4 z-50">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  saveMutation.mutate();
                }}
                className={`${
                  isSaved
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-white text-gray-600'
                } opacity-0 rounded group-hover:opacity-100 transition p-1 font-medium cursor-pointer`}
              >
                <BookmarkIcon className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  likeMutation.mutate();
                }}
                className={`${
                  isLiked
                    ? 'bg-pink-100 text-pink-600'
                    : 'bg-white text-gray-600'
                } opacity-0 rounded group-hover:opacity-100 ml-2 transition p-1 font-medium cursor-pointer`}
              >
                <HeartIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
        <div className="flex justify-between mt-1 items-center px-1">
          <Link href={`/${post.user.username}`}>
            <div className="flex hover:text-pink-600 cursor-pointer">
              <Image
                src={post.user.profilePicUrl}
                alt={post.user.name}
                className="rounded-full object-cover"
                width={25}
                height={20}
              />
              <p className="ml-2">{post.user.username}</p>
            </div>
          </Link>
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
      </motion.div>
    </Link>
  );
};

export default PostCard;
