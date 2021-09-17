import axios from 'axios';
import cookie from 'js-cookie';
import { Fragment } from 'react';
import { parseCookies } from 'nookies';
import InfiniteScroll from 'react-infinite-scroller';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { QueryClient, useInfiniteQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import baseURL from '../utils/baseURL';
import PostCard from '../components/PostCard';
import NoPosts from '../components/NoPosts';

const getFeed = async (page, token) => {
  const { data } = await axios.get(`${baseURL}/api/posts/feed?page=${page}`, {
    headers: { Authorization: token },
  });
  return data;
};

const FeedPage = ({ user }) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ['feed'],
      ({ pageParam = 1 }) => getFeed(pageParam, cookie.get('token')),
      {
        getNextPageParam: (lastPage) => lastPage.next,
      }
    );

  if (data.pages[0].posts.length === 0) {
    return <NoPosts />;
  }

  return (
    <>
      <div className="container mx-auto px-6 py-8 md:px-12 md:py-10">
        <h1 className="text-pink-600 text-2xl font-semibold mb-1">Your Feed</h1>
        <p className="text-gray-600 text-md mb-5">
          Recent posts from developers you follow
        </p>
        <InfiniteScroll
          hasMore={hasNextPage}
          loadMore={fetchNextPage}
          className="container mx-auto grid gap-x-5 gap-y-7 place-items-center grid-cols-auto-fill"
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
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);

  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(['feed'], ({ pageParam = 1 }) =>
    getFeed(pageParam, token)
  );
  return {
    props: {
      // This is hacky but couldn't find a better solution
      // https://github.com/tannerlinsley/react-query/issues/1458
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      title: 'Your Feed on Driwwwle',
    },
  };
}

export default FeedPage;
