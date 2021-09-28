import axios from 'axios';
import Image from 'next/image';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';

import baseURL from '../../utils/baseURL';

const Search = ({ chats, setChats }) => {
  const [searchText, setSearchText] = useState('');

  const router = useRouter();

  const { data } = useQuery(['search', 'users', searchText], async () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const promise = await axios.get(
      `${baseURL}/api/search/users/${searchText}`,
      {
        cancelToken: source.token,
        headers: {
          Authorization: cookie.get('token'),
        },
      }
    );

    promise.cancel = () => {
      source.cancel();
    };

    return promise.data;
  });

  const addChat = (user) => {
    const alreadyInChat =
      chats.length > 0 &&
      chats.filter((chat) => chat.messagesWith === user._id).length > 0;

    if (alreadyInChat) {
      router.push(`/messages?chat=${user._id}`);
    } else {
      const newChat = {
        messagesWith: user._id,
        name: user.name,
        profilePicUrl: user.profilePicUrl,
        lastMessage: '',
        date: Date.now(),
      };
      setChats((prevState) => [newChat, ...prevState]);
      router.push(`/messages?chat=${user._id}`);
    }
    setSearchText('');
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search by name or username"
        className="w-full bg-gray-100 p-2 border-0 border-b border-gray-200 focus:ring-pink-600 focus:border-pink-600"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {data && searchText.trim().length !== 0 && (
        <div className="absolute space-y-1 top-14 w-full bg-white z-50 py-2 shadow-2xl rounded">
          {data.length > 0 ? (
            data.map((user) => (
              <div
                onClick={() => addChat(user)}
                className="flex items-center cursor-pointer px-2 py-1 hover:bg-gray-100"
                key={user._id}
              >
                <Image
                  src={user.profilePicUrl}
                  height={30}
                  width={30}
                  className="rounded-full object-cover"
                />
                <p className="text-md ml-2">
                  {user.name.length > 20
                    ? user.name.substring(0, 20) + '...'
                    : user.name}
                </p>
              </div>
            ))
          ) : (
            <p>No users found..</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
