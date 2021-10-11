import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { formatDistanceToNow } from 'date-fns';
import {
  TrashIcon,
  HeartIcon as HeartOutlineIcon,
} from '@heroicons/react/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/solid';

import baseURL from '../../utils/baseURL';

const Reply = ({ reply, user, queryClient, comment, postId }) => {
  const isLiked =
    user && reply.likes.filter((like) => like.user === user._id).length > 0;

  const replyMutation = useMutation(
    async () => {
      const { data } = await axios.delete(
        `${baseURL}/api/comments/${postId}/${comment._id}/${reply._id}`,
        {
          headers: { Authorization: cookie.get('token') },
        }
      );
      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['comments', postId], data);
        toast.success('Your reply has been deleted');
      },
    }
  );

  const likeMutation = useMutation(
    async () => {
      const { data } = await axios.put(
        `${baseURL}/api/comments/like/${postId}/${comment._id}/${reply._id}`,
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
      onSuccess: (data) => {
        queryClient.setQueryData(['comments', postId], data);
      },
    }
  );

  return (
    <div className="flex mt-4 w-full items-start mb-1 md:w-5/6">
      <Link href={`/${reply.user.username}`}>
        <div className="w-100 mr-2 cursor-pointer">
          <Image
            src={reply.user.profilePicUrl}
            height={40}
            width={40}
            className="rounded-full object-cover"
          />
        </div>
      </Link>
      <div className="ml-2 flex flex-col flex-1">
        <h4 className="font-semibold">
          <Link href={`/${reply.user.username}`}>
            <a className="hover:text-pink-600 transition">
              {reply.user.username}
            </a>
          </Link>{' '}
          <span className="text-gray-500 text-xs font-normal">
            {formatDistanceToNow(new Date(reply.date), {
              addSuffix: true,
            })}
          </span>
        </h4>
        <p className="text-sm">{reply.text}</p>
        <div className="flex items-center space-x-2 text-gray-700 mt-1">
          <div className="flex items-center space-x-1">
            {isLiked ? (
              <HeartSolidIcon
                onClick={() => likeMutation.mutate()}
                className="h-4 w-4 text-pink-600 cursor-pointer"
              />
            ) : (
              <HeartOutlineIcon
                onClick={() => likeMutation.mutate()}
                className="h-4 w-4 text-pink-600 cursor-pointer"
              />
            )}
            <span className="text-sm whitespace-pre-wrap">
              {reply.likes.length}
            </span>
          </div>
          {user && user._id === reply.user._id && (
            <TrashIcon
              onClick={() => replyMutation.mutate(reply._id)}
              className="h-4 w-4 cursor-pointer text-pink-600"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Reply;
