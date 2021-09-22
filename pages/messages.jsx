import axios from 'axios';
import cookie from 'js-cookie';
import io from 'socket.io-client';
import { useState, useRef, useEffect } from 'react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { ChatAltIcon } from '@heroicons/react/outline';

import ChatItem from '../components/messages-page/ChatItem';
import Search from '../components/messages-page/Search';
import Banner from '../components/messages-page/Banner';
import Message from '../components/messages-page/Message';
import MessageInput from '../components/messages-page/MessageInput';

import baseURL from '../utils/baseURL';
import getUserInfo from '../utils/getUserInfo';
import messageNotification from '../utils/messageNotification';

const getChats = async (token) => {
  const { data } = await axios.get(`${baseURL}/api/chats`, {
    headers: { Authorization: token },
  });
  return data;
};

const scrollToBottom = (divRef) => {
  divRef.current && divRef.current.scrollIntoView({ behaviour: 'smooth' });
};

const MessagesPage = ({ user }) => {
  const { data } = useQuery(['messages'], () => getChats(cookie.get('token')));

  const router = useRouter();
  const { chat } = router.query;

  if (chat === user._id) {
    router.push('/messages');
  }

  const [chats, setChats] = useState(data);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [banner, setBanner] = useState({ name: '', profilePicUrl: '' });

  const socket = useRef();
  const openChatId = useRef('');
  const divRef = useRef();

  // Connecting to socket
  useEffect(() => {
    if (!socket.current) {
      socket.current = io(baseURL);
    }
    if (socket.current) {
      socket.current.emit('join', { userId: user._id });
      socket.current.on('connectedUsers', ({ users }) => {
        users.length > 0 && setConnectedUsers(users);
      });
    }
  }, []);

  // Loading message from socket
  useEffect(() => {
    const loadMessages = () => {
      socket.current.emit('loadMessages', {
        userId: user._id,
        messagesWith: chat,
      });

      socket.current.on('messagesLoaded', ({ chat }) => {
        setMessages(chat.messages);
        setBanner({
          name: chat.messagesWith.name,
          profilePicUrl: chat.messagesWith.profilePicUrl,
        });
        openChatId.current = chat.messagesWith._id;
        divRef.current && scrollToBottom(divRef);
      });

      socket.current.on('noChatFound', async () => {
        const data = await getUserInfo(chat);
        if (data?.name && data?.profilePicUrl) {
          const chatAlreadyExists = chats.find(
            (chatItem) => chatItem.messagesWith === chat
          );
          if (!chatAlreadyExists) {
            const newChat = {
              messagesWith: chat,
              name: data.name,
              profilePicUrl: data.profilePicUrl,
              lastMessage: '',
              date: Date.now(),
            };
            setChats((prevState) => [newChat, ...prevState]);
          }
          setBanner({ name: data.name, profilePicUrl: data.profilePicUrl });
          setMessages([]);
          openChatId.current = router.query.chat;
        }
      });
    };

    if (socket.current && router.query.chat) {
      loadMessages();
    }
  }, [router.query.chat]);

  const sendMessage = (message) => {
    if (socket.current) {
      socket.current.emit('newMessage', {
        userId: user._id,
        receiver: openChatId.current || router.query.chat,
        message,
      });
    }
  };

  // Receiving new messages from socket
  useEffect(() => {
    if (socket.current) {
      socket.current.on('messageSent', ({ newMessage }) => {
        if (newMessage.receiver === openChatId.current) {
          setMessages((prev) => [...prev, newMessage]);
          setChats((prev) => {
            const previousChat = prev.find(
              (chat) => chat.messagesWith === newMessage.receiver
            );
            previousChat.lastMessage = newMessage.message;
            previousChat.date = newMessage.date;
            return [...prev];
          });
        }
      });

      socket.current.on('newMessageReceived', async ({ newMessage }) => {
        let senderName;

        if (newMessage.sender === openChatId.current) {
          setMessages((prev) => [...prev, newMessage]);
          setChats((prev) => {
            const previousChat = prev.find(
              (chat) => chat.messagesWith === newMessage.sender
            );
            previousChat.lastMessage = newMessage.message;
            previousChat.date = newMessage.date;
            senderName = previousChat.name;
            return [...prev];
          });
        } else {
          const previouslyMessaged =
            chat.filter((chat) => chat.messagesWith === newMessage.sender)
              .length > 0;
          if (previouslyMessaged) {
            setChats((prev) => {
              const previousChat = prev.find(
                (chat) => chat.messagesWith === newMessage.sender
              );
              previousChat.lastMessage = newMessage.message;
              previousChat.date = newMessage.date;
              senderName = previousChat.name;
              return [...prev];
            });
          } else {
            const { name, profilePicUrl } = await getUserInfo(
              newMessage.sender
            );
            senderName = name;
            const newChat = {
              messagesWith: newMessage.sender,
              name,
              profilePicUrl,
              lastMessage: newMessage.message,
              date: newMessage.date,
            };
            setChats((prev) => [newChat, ...prev]);
          }
        }
        messageNotification(senderName);
      });
    }
  }, []);

  useEffect(() => {
    messages.length > 0 && scrollToBottom(divRef);
  }, [messages]);

  return (
    <div className="bg-gray-50 container mx-auto h-chat">
      <div className="bg-white border border-gray-200 rounded flex h-full">
        <div
          className={`${
            chat ? 'hidden md:block' : 'block'
          } w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-full overflow-y-auto`}
        >
          <div className="border-b border-gray-200 p-3 relative">
            <button className="flex items-center mx-auto select-none font-semibold focus:outline-none">
              {user.name}'s Chats
            </button>
          </div>
          <Search chats={chats} setChats={setChats} />
          <ul className="py-1">
            {chats.map((chat) => (
              <ChatItem
                key={chat.messagesWith}
                chat={chat}
                connectedUsers={connectedUsers}
              />
            ))}
          </ul>
        </div>
        <div
          className={`${
            chat ? 'flex w-full' : 'hidden md:flex'
          } md:w-2/3 lg:w-3/4 border-l border-gray-200 items-center justify-center text-center`}
        >
          {banner.name && banner.profilePicUrl ? (
            <div className="h-full w-full relative flex flex-col">
              <Banner banner={banner} />
              <div className="bg-gray-50 flex-1 p-4 max-h-100 overflow-x-hidden">
                {messages.map((message, index) => (
                  <Message
                    divRef={divRef}
                    key={index}
                    message={message}
                    user={user}
                    setMessages={setMessages}
                    messagesWith={chat}
                  />
                ))}
              </div>
              <MessageInput sendMessage={sendMessage} />
            </div>
          ) : (
            <div className="space-y-5">
              <div className="border border-pink-600 rounded-full inline-flex p-5 items-center justify-center">
                <ChatAltIcon className="h-20 w-20 text-pink-600" />
              </div>
              <div className="space-y-0.5">
                <h1 className="font-semibold text-xl">Chat with developers!</h1>
                <p className="text-gray-600 min-w-46">
                  Select or search for a user to start chatting with.
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
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      title: 'Your Messages on Driwwwle',
    },
  };
}

export default MessagesPage;
