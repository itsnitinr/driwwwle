import axios from 'axios';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import baseURL from '../utils/baseURL';
import HeroBanner from '../components/home/HeroBanner';
import PostCard from '../components/PostCard';

const getPosts = async () => {
  const { data } = await axios.get(`${baseURL}/api/posts`);
  return data;
};

const HomePage = ({ user }) => {
  const { data } = useQuery(['posts'], getPosts);

  return (
    <main className="bg-gray-50">
      <HeroBanner />
      <div className="container mx-auto py-8 px-6 md:px-12 md:py-10 grid gap-x-5 gap-y-7 place-items-center grid-cols-auto-fill">
        {data.map((post) => (
          <PostCard user={user} key={post._id} post={post} />
        ))}
      </div>
    </main>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['posts'], getPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      title: 'Recent Posts on Driwwwle',
    },
  };
}

export default HomePage;
