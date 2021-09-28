import axios from 'axios';
import { Fragment } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { QueryClient, useInfiniteQuery } from 'react-query';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { dehydrate } from 'react-query/hydration';

import baseURL from '../utils/baseURL';
import HeroBanner from '../components/home/HeroBanner';
import PostCard from '../components/PostCard';

const getPosts = async (page) => {
  const { data } = await axios.get(`${baseURL}/api/posts?page=${page}`);
  return data;
};

const HomePage = ({ user }) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(['posts'], ({ pageParam = 1 }) => getPosts(pageParam), {
      getNextPageParam: (lastPage) => lastPage.next,
    });

  return (
    <main className="bg-gray-50">
      <HeroBanner user={user} />
      <InfiniteScroll
        hasMore={hasNextPage}
        loadMore={fetchNextPage}
        className="container mx-auto py-8 px-6 md:px-12 md:py-10 grid gap-x-5 gap-y-7 place-items-center grid-cols-auto-fill"
      >
        {data.pages.map((page, i) => (
          <Fragment key={i}>
            {page.posts.map((post) => (
              <PostCard user={user} key={post._id} post={post} />
            ))}
          </Fragment>
        ))}
      </InfiniteScroll>
      {isFetchingNextPage && (
        <div className="py-8">
          <AiOutlineLoading3Quarters className="h-8 w-8 animate-spin mx-auto text-pink-600" />
        </div>
      )}
    </main>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(['posts'], ({ pageParam = 1 }) =>
    getPosts(pageParam)
  );

  return {
    props: {
      // This is hacky but couldn't find a better solution
      // https://github.com/tannerlinsley/react-query/issues/1458
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      title: 'Recent Posts on Driwwwle',
    },
  };
}

export default HomePage;
