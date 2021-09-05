import axios from 'axios';
import Image from 'next/image';
import cookie from 'js-cookie';
import { useState } from 'react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { ChatAltIcon } from '@heroicons/react/outline';

import baseURL from '../utils/baseURL';
import ChatItem from '../components/messages-page/ChatItem';

const getChats = async (token) => {
  const { data } = await axios.get(`${baseURL}/api/chats`, {
    headers: { Authorization: token },
  });
  return data;
};

const MessagesPage = ({ user }) => {
  const { data } = useQuery(['messages'], () => getChats(cookie.get('token')));

  const [searchText, setSearchText] = useState('');

  const { data: usersData } = useQuery(
    ['search', 'users', searchText],
    async () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      const promise = await axios.get(
        `${baseURL}/api/search/users/${searchText}`,
        {
          cancelToken: source.token,
        }
      );

      promise.cancel = () => {
        source.cancel();
      };

      return promise.data;
    }
  );

  const router = useRouter();
  const { chat } = router.query;

  if (chat === user._id) {
    router.push('/messages');
  }

  return (
    <div className="bg-gray-50 container mx-auto h-screen">
      <div className="bg-white border border-gray-200 rounded flex h-full">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-full">
          <div className="border-b border-gray-200 p-3 relative">
            <button className="flex items-center mx-auto select-none font-semibold focus:outline-none">
              {user.name}'s Chats
            </button>
          </div>
          <div className="relative">
            <input
              placeholder="Search by name or username"
              className="w-full bg-gray-100 p-2 border-b border-gray-200"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {usersData && searchText.trim().length !== 0 && (
              <div className="absolute space-y-2 top-14 w-full bg-white z-50 px-2 py-4 shadow-2xl rounded">
                {usersData.length > 0 ? (
                  usersData.map((user) => (
                    <div
                      onClick={() => {
                        router.push(`/messages?chat=${user._id}`);
                        setSearchText('');
                      }}
                      className="flex cursor-pointer"
                      key={user._id}
                    >
                      <Image
                        src={user.profilePicUrl}
                        height={30}
                        width={30}
                        className="rounded-full"
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
          <ul className="py-1 overflow-auto">
            {data.map((chat) => (
              <ChatItem key={chat.messagesWith} chat={chat} />
            ))}
          </ul>
        </div>
        <div className="hidden sm:w-1/2 md:w-2/3 lg:w-3/4 border-l border-gray-200 sm:flex items-center justify-center text-center">
          {chat ? (
            <p>Chatting with {chat}</p>
          ) : (
            <div className="space-y-5">
              <div className="border border-pink-600 rounded-full inline-flex p-5 items-center justify-center">
                <ChatAltIcon className="h-20 w-20 text-pink-600" />
              </div>
              <div className="space-y-0.5">
                <h1 className="font-semibold text-xl">Chat with developers!</h1>
                <p className="text-gray-600 min-w-46">
                  Select or search for a user to start chatting with
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['messages'], () => getChats(token));
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default MessagesPage;
