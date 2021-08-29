import axios from 'axios';
import cookie from 'js-cookie';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';

import baseURL from '../../utils/baseURL';

const NewComment = ({ id, queryClient }) => {
  const [text, setText] = useState('');

  const mutation = useMutation(
    async () => {
      const { data } = await axios.post(
        `${baseURL}/api/posts/comment/${id}`,
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
        const old = queryClient.getQueryData(['posts', id]);
        queryClient.setQueryData(['posts', id], { ...old, comments: data });
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
        className="w-full md:w-5/6 mb-1"
        rows="2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button
        type="submit"
        className="block text-sm bg-pink-600 text-white p-2 mb-8"
      >
        Add Comment
      </button>
    </form>
  );
};

export default NewComment;
