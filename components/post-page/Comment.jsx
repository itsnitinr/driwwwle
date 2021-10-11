import axios from 'axios';
import Link from 'next/link';
import cookie from 'js-cookie';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { formatDistanceToNow } from 'date-fns';
import {
  TrashIcon,
  HeartIcon as HeartOutlineIcon,
  XIcon,
} from '@heroicons/react/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/solid';
import { AiOutlineSend } from 'react-icons/ai';

import Reply from './Reply';

import baseURL from '../../utils/baseURL';

const Comment = ({ comment, user, postId, queryClient }) => {
  const isLiked =
    user && comment.likes.filter((like) => like.user === user._id).length > 0;

  const mutation = useMutation(
    async () => {
      const { data } = await axios.delete(
        `${baseURL}/api/comments/${postId}/${comment._id}`,
        {
          headers: { Authorization: cookie.get('token') },
        }
      );
      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['comments', postId], data);
        toast.success('Your comment has been deleted');
      },
    }
  );

  const addReplyMutation = useMutation(
    async () => {
      const { data } = await axios.post(
        `${baseURL}/api/comments/${postId}/${comment._id}/`,
        { text: replyText },
        {
          headers: { Authorization: cookie.get('token') },
        }
      );
      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['comments', postId], data);
        toast.success('Your reply has been posted');
      },
    }
  );

  const likeMutation = useMutation(
    async () => {
      const { data } = await axios.put(
        `${baseURL}/api/comments/like/${postId}/${comment._id}`,
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

  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState('');

  const postReply = (e) => {
    e.preventDefault();
    addReplyMutation.mutate();
    setReplyOpen(false);
    setReplyText('');
  };

  return (
    <>
      <div className="flex w-full items-start mb-4 md:w-5/6">
        <Link href={`/${comment.user.username}`}>
          <div className="w-100 mr-2 cursor-pointer">
            <Image
              src={comment.user.profilePicUrl}
              height={40}
              width={40}
              className="rounded-full object-cover"
            />
          </div>
        </Link>
        <div className="ml-2 flex flex-col flex-1">
          <h4 className="font-semibold">
            <Link href={`/${comment.user.username}`}>
              <a className="hover:text-pink-600 transition">
                {comment.user.username}
              </a>
            </Link>{' '}
            <span className="text-gray-500 text-xs font-normal">
              {formatDistanceToNow(new Date(comment.date), { addSuffix: true })}
            </span>
          </h4>
          <p className="text-sm whitespace-pre-wrap">{comment.text}</p>
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
              <span className="text-sm">{comment.likes.length}</span>
            </div>
            <a
              onClick={() => setReplyOpen(true)}
              className="text-sm text-pink-600 cursor-pointer hover:underline"
            >
              Reply
            </a>
            {user && user._id === comment.user._id && (
              <TrashIcon
                onClick={() => mutation.mutate()}
                className="h-4 w-4 cursor-pointer text-pink-600"
              />
            )}
          </div>
          {replyOpen && (
            <form onSubmit={postReply} className="relative mt-3 flex">
              <input
                className="border-2 rounded-l p-1.5 text-sm border-pink-600 w-full focus:outline-none"
                placeholder="Type your reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                required
              />
              <XIcon
                onClick={() => setReplyOpen(false)}
                className="absolute right-10 top-2 cursor-pointer h-5 w-5 text-gray-400"
              />
              <button className="bg-pink-600 rounded-r px-2 py-1  h-100">
                <AiOutlineSend className="text-white h-4 w-4" />
              </button>
            </form>
          )}
          {comment.replies.map((reply) => (
            <Reply
              key={reply._id}
              reply={reply}
              user={user}
              queryClient={queryClient}
              comment={comment}
              postId={postId}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Comment;
