import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { SearchIcon } from '@heroicons/react/solid';

import baseURL from '../utils/baseURL';

const Search = () => {
  const [searchText, setSearchText] = useState('');

  const router = useRouter();

  const { data, isLoading, isSuccess } = useQuery(
    ['search', searchText],
    async () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      const promise = await axios.get(`${baseURL}/api/search/${searchText}`, {
        cancelToken: source.token,
      });

      promise.cancel = () => {
        source.cancel();
      };

      return promise.data;
    },
    {
      enabled: !!searchText,
    }
  );

  return (
    <div className="relative flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
      <div className="max-w-lg w-full lg:max-w-xs">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="search"
            name="search"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            placeholder="Search for users and posts..."
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            autoComplete="off"
          />
          {searchText.trim() !== '' && !isLoading && isSuccess && (
            <div className="absolute top-14 w-full bg-white z-50 px-2 py-4 shadow-2xl rounded">
              <h1 className="text-sm font-semibold mb-2">Users</h1>
              <div className="flex flex-col space-y-2">
                {!data.users || data.users.length === 0 ? (
                  <p className="text-gray-400 text-xs">No users found..</p>
                ) : (
                  data.users.map((user) => (
                    <div
                      onClick={() => {
                        router.push(`/${user.username}`);
                        setSearchText('');
                      }}
                      className="flex cursor-pointer items-center"
                      key={user._id}
                    >
                      <Image
                        src={user.profilePicUrl}
                        height={30}
                        width={30}
                        className="rounded-full object-cover"
                      />
                      <p className="text-md ml-2">
                        {user.name.length > 20
                          ? user.name.substring(0, 20) + '...'
                          : user.name}
                      </p>
                    </div>
                  ))
                )}
                <h1 className="text-sm font-semibold my-2">Posts</h1>
                {!data.posts || data.posts.length === 0 ? (
                  <p className="text-gray-400 text-xs">No posts found..</p>
                ) : (
                  data.posts.map((post) => (
                    <div
                      onClick={() => {
                        router.push(`/posts/${post._id}`);
                        setSearchText('');
                      }}
                      className="flex items-center cursor-pointer"
                      key={post._id}
                    >
                      <Image
                        src={post.images[0]}
                        height={40}
                        width={60}
                        className="rounded"
                      />
                      <div>
                        <p className="text-sm ml-2 font-semibold">
                          {post.title.length > 20
                            ? post.title.substring(0, 20) + '...'
                            : post.title}
                        </p>
                        <p className="ml-2 text-xs text-gray-600">
                          {post.user.name.length > 20
                            ? post.user.name.substring(0, 20) + '...'
                            : post.user.name}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <a
                onClick={() => {
                  router.push('/search');
                  setSearchText('');
                }}
                className="text-xs cursor-pointer block mt-4 text-pink-600 text-center"
              >
                Try Advanced Search
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
