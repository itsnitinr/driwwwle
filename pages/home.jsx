import axios from 'axios';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import baseURL from '../utils/baseURL';
import HeroBanner from '../components/home/HeroBanner';

const getPosts = async () => {
  const { data } = await axios.get(`${baseURL}/api/posts`);
  return data;
};

const HomePage = () => {
  const { data } = useQuery(['posts'], getPosts);

  return (
    <>
      <HeroBanner />
      <main className="container mx-auto p-8 md:px-16 md:py-10">
        {data.map((post) => (
          <h1 key={post._id}>{post.title}</h1>
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
