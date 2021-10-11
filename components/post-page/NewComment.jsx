import axios from 'axios';
import cookie from 'js-cookie';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { ChatAltIcon } from '@heroicons/react/outline';

import baseURL from '../../utils/baseURL';

const NewComment = ({ id, queryClient }) => {
  const [text, setText] = useState('');

  const mutation = useMutation(
    async () => {
      const { data } = await axios.post(
        `${baseURL}/api/comments/${id}`,
        { text },
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
        setText('');
        queryClient.setQueryData(['comments', id], data);
        toast.success('Your comment has been posted');
      },
    }
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate();
      }}
    >
      <textarea
        className="w-full md:w-5/6 focus:ring-pink-600 flex-1 focus:border-pink-600 rounded shadow"
        rows="2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Leave a nice comment.."
        required
      />
      <button
        type="submit"
        className="text-sm bg-pink-600 text-white p-2 flex items-center space-x-2 mb-8 rounded shadow"
      >
        <ChatAltIcon className="h-4 w-4 text-white" />
        <span>Post Comment</span>
      </button>
    </form>
  );
};

export default NewComment;
