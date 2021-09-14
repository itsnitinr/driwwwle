import axios from 'axios';
import cookie from 'js-cookie';
import { parseCookies } from 'nookies';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import baseURL from '../utils/baseURL';
import PostCard from '../components/PostCard';
import NoPosts from '../components/NoPosts';

const getFeed = async (token) => {
  const { data } = await axios.get(`${baseURL}/api/posts/feed`, {
    headers: { Authorization: token },
  });
  return data;
};

const FeedPage = ({ user }) => {
  const { data } = useQuery(['feed'], () => getFeed(cookie.get('token')));

  if (data.length === 0) {
    return <NoPosts />;
  }

  return (
    <>
      <div className="container mx-auto p-8 md:px-16 md:py-10">
        <h1 className="text-pink-600 text-2xl font-semibold mb-1">Your Feed</h1>
        <p className="text-gray-600 text-md mb-5">
          Recent posts from people you follow
        </p>
        <div className="grid gap-5 place-items-start grid-cols-auto-fit">
          {data.map((post) => (
            <PostCard user={user} key={post._id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['feed'], () => getFeed(token));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      title: 'Your Feed on Driwwwle',
    },
  };
}

export default FeedPage;
