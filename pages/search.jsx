import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useState, Fragment } from 'react';
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroller';
import { SearchIcon } from '@heroicons/react/outline';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import PostCard from '../components/PostCard';
import SearchHeader from '../components/SearchHeader';

import baseURL from '../utils/baseURL';

const SearchPage = ({ user }) => {
  const [text, setText] = useState('');
  const [type, setType] = useState('posts');

  const { data, isLoading, isFetching, refetch, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      ['search', type, text],
      async ({ pageParam = 1 }) => {
        const { data } = await axios.get(
          `${baseURL}/api/search/advanced/${type}/${text}?page=${pageParam}`
        );
        return data;
      },
      {
        enabled: false,
        keepPreviousData: true,
        getNextPageParam: (lastPage) => lastPage.next,
      }
    );

  const onSubmit = async (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div>
      <SearchHeader />
      <form
        onSubmit={onSubmit}
        className="-mt-7 relative rounded-lg w-11/12 md:w-4/5 lg:w-2/3 max-w-4xl mx-auto shadow-lg"
      >
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">
            <SearchIcon className="h-5 w-5" />
          </span>
        </div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="focus:ring-gray-100 focus:ring-2 focus:border-pink-500 block w-full pl-10 pr-12 py-4 sm:text-lg border-none rounded-lg"
          placeholder="Search..."
          required
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <label htmlFor="search-for" className="sr-only">
            Search For
          </label>
          <select
            id="search-for"
            className="focus:ring-gray-100 focus:ring-2 focus:border-pink-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-md rounded-lg"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="posts">Posts</option>
            <option value="users">Users</option>
            <option value="tag">Tag</option>
          </select>
        </div>
      </form>
      {data?.pages[0]?.posts?.length > 0 && (
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
      )}
      {data?.pages[0]?.posts?.length === 0 && (
        <p className="text-pink-600 text-center my-8 text-lg">No posts found</p>
      )}
      {data?.pages[0]?.users?.length > 0 && (
        <InfiniteScroll
          hasMore={hasNextPage}
          loadMore={fetchNextPage}
          className="text-center container mx-auto py-8 px-6 md:px-12 md:py-10 grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-5 md:gap-x-6 lg:gap-x-8 lg:grid-cols-6 lg:gap-y-12 xl:grid-cols-7"
        >
          {data.pages.map((page, i) => (
            <Fragment key={i}>
              {page.users.map((user) => (
                <Link key={user._id} href={`/${user.username}`}>
                  <div className="hover:text-pink-600 transition cursor-pointer">
                    <div className="space-y-1">
                      <Image
                        className="mx-auto h-16 w-16 rounded-full lg:w-20 lg:h-20 object-cover"
                        src={user.profilePicUrl}
                        alt={user.name}
                        width={70}
                        height={70}
                      />
                      <h3 className="text-xs font-medium lg:text-sm">
                        {user.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </Fragment>
          ))}
        </InfiniteScroll>
      )}
      {data?.pages[0]?.users?.length === 0 && (
        <p className="text-pink-600 text-center my-8 text-lg">No users found</p>
      )}
      {(isLoading || isFetching) && (
        <AiOutlineLoading3Quarters className="h-8 my-8 animate-spin mx-auto w-8 text-pink-600" />
      )}
    </div>
  );
};

export async function getServerSideProps() {
  return { props: { title: 'Advanced Search on Driwwwle' } };
}

export default SearchPage;
