import Image from 'next/image';
import axios from 'axios';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { TrashIcon } from '@heroicons/react/outline';

import baseURL from '../../utils/baseURL';

const Comment = ({ comment, user, postId, queryClient }) => {
  const mutation = useMutation(
    async () => {
      const { data } = await axios.delete(
        `${baseURL}/api/posts/comment/${postId}/${comment._id}`,
        {
          headers: { Authorization: cookie.get('token') },
        }
      );
      return data;
    },
    {
      onSuccess: (data) => {
        const old = queryClient.getQueryData(['posts', postId]);
        queryClient.setQueryData(['posts', postId], { ...old, comments: data });
        toast.success('Your comment has been deleted');
      },
    }
  );

  return (
    <div className="flex w-full items-start mb-4 md:w-5/6">
      <div className="w-100 mr-2">
        <Image
          src={comment.user.profilePicUrl}
          height={45}
          width={45}
          className="rounded-full"
        />
      </div>
      <div className="ml-2 flex flex-col flex-1">
        <h4 className="font-semibold">
          {comment.user.username}{' '}
          <span className="text-gray-500 text-xs font-normal">
            Posted at {comment.date}
          </span>
        </h4>
        <p className="text-sm">{comment.text}</p>
        {user && user._id === comment.user._id && (
          <TrashIcon
            onClick={() => mutation.mutate()}
            className="h-4 w-4 mt-1 cursor-pointer text-red-600"
          />
        )}
      </div>
    </div>
  );
};

export default Comment;
