import axios from 'axios';
import cookie from 'js-cookie';
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

  const router = useRouter();
  const { chat } = router.query;

  return (
    <div className="bg-gray-50 container mx-auto h-screen">
      <div className="bg-white border border-gray-200 rounded flex h-full">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-full">
          <div className="border-b border-gray-200 p-3 relative">
            <button className="flex items-center mx-auto select-none font-semibold focus:outline-none">
              {user.name}'s Chats
            </button>
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
