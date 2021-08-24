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

const HomePage = () => {
  const { data } = useQuery(['posts'], getPosts);

  return (
    <>
      <HeroBanner />
      <main className="container bg-gray-50 mx-auto bg-gray-50 p-8 md:px-16 md:py-10 grid gap-5 place-items-center grid-cols-auto-fit">
        {data.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </main>
    </>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['posts'], getPosts);

  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default HomePage;
