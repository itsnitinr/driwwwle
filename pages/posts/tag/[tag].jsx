import axios from 'axios';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroller';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { QueryClient, useInfiniteQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import baseURL from '../../../utils/baseURL';
import PostCard from '../../../components/PostCard';

const TagPage = ({ user }) => {
  const router = useRouter();
  const { tag } = router.query;

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ['tags', tag],
      async ({ pageParam = 1 }) => {
        const { data } = await axios.get(
          `${baseURL}/api/search/advanced/tag/${tag}?page=${pageParam}`
        );
        return data;
      },
      {
        getNextPageParam: (lastPage) => lastPage.next,
      }
    );

  return (
    <>
      <div className="container mx-auto px-6 py-8 md:px-12 md:py-10">
        <h1 className="text-gray-500 text-xl font-semibold mb-8">
          Found {data.pages[0].total} posts with{' '}
          <span className="text-pink-600">{tag}</span> tag
        </h1>
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
  const { tag } = ctx.params;

  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(
    ['tags', tag],
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        `${baseURL}/api/search/advanced/tag/${tag}?page=${pageParam}`
      );
      return data;
    }
  );

  return {
    props: {
      // This is hacky but couldn't find a better solution
      // https://github.com/tannerlinsley/react-query/issues/1458
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      title: `Posts with ${tag} tag on Driwwwle`,
    },
  };
}

export default TagPage;
