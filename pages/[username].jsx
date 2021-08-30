import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { UserIcon, ViewGridIcon } from '@heroicons/react/solid';

import PostCard from '../components/PostCard';
import ProfileHeader from '../components/profile-page/ProfileHeader';

import baseURL from '../utils/baseURL';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const tabs = [
  { name: 'Posts', icon: ViewGridIcon },
  { name: 'About', icon: UserIcon },
];

const getProfile = async (username) => {
  const { data } = await axios.get(`${baseURL}/api/profile/${username}`);
  return data;
};

const ProfilePage = ({ user }) => {
  const [currentTab, setCurrentTab] = useState('Posts');

  const router = useRouter();
  const { username } = router.query;

  const { data } = useQuery(['profiles', username], () => getProfile(username));

  if (!data) return <h1>Not found!</h1>;

  return (
    <>
      <ProfileHeader
        profile={data.profile}
        followers={data.followers}
        following={data.following}
        user={user}
      />
      <div className="container mx-auto px-8 md:px-16 pb-8">
        <div className="sm:hidden mb-8">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full focus:ring-pink-600 focus:border-indigo-500 border-gray-300 rounded-md"
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  onClick={() => setCurrentTab(tab.name)}
                  className={classNames(
                    currentTab === tab.name
                      ? 'border-pink-600 text-pink-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'group inline-flex cursor-pointer items-center py-4 px-1 border-b-2 font-medium text-sm'
                  )}
                  aria-current={currentTab === tab.name ? 'page' : undefined}
                >
                  <tab.icon
                    className={classNames(
                      currentTab === tab.name
                        ? 'text-pink-600'
                        : 'text-gray-400 group-hover:text-gray-500',
                      '-ml-0.5 mr-2 h-5 w-5'
                    )}
                    aria-hidden="true"
                  />
                  <span>{tab.name}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="grid gap-5 place-items-center grid-cols-auto-fit">
          {currentTab === 'Posts' ? (
            data.posts.map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            <h1>About Me</h1>
          )}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { username } = ctx.params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['profiles', username], () =>
    getProfile(username)
  );
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default ProfilePage;
