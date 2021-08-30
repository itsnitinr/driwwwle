import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import cookie from 'js-cookie';
import { useMutation, useQueryClient } from 'react-query';
import {
  UserAddIcon,
  CogIcon,
  LoginIcon,
  CheckCircleIcon,
} from '@heroicons/react/outline';

import baseURL from '../../utils/baseURL';

const ProfileHeader = ({ profile, followers, following, user }) => {
  const isFollowing =
    user &&
    followers.filter((follower) => follower.user === user._id).length > 0;

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      const { data } = await axios.post(
        `${baseURL}/api/profile/follow/${profile.user._id}`,
        {},
        { headers: { Authorization: cookie.get('token') } }
      );
      return data;
    },
    {
      onSuccess: (data) => {
        const old = queryClient.getQueryData([
          'profiles',
          profile.user.username,
        ]);
        queryClient.setQueryData(['profiles', profile.user.username], {
          ...old,
          followers: data,
        });
      },
    }
  );

  return (
    <div className="flex justify-center px-8 py-8 md:py-12">
      <div>
        <Image
          className="rounded-full"
          src={profile.user.profilePicUrl}
          height={100}
          width={100}
        />
      </div>
      <div className="ml-5">
        <h1 className="text-2xl mb-1 text-gray-800 font-bold">
          {profile.user.name}
        </h1>
        <h3 className="mb-2">
          {followers.length} Followers | {following.length} Following
        </h3>
        {user && user._id === profile.user._id ? (
          <button className="bg-gray-100 flex items-center font-semibold rounded-md px-3 py-2">
            <CogIcon className="h-5 w-5 mr-2" /> Update
          </button>
        ) : user ? (
          isFollowing ? (
            <button
              onClick={() => mutation.mutate()}
              className="bg-pink-100 text-pink-600 text flex items-center font-semibold rounded-md px-3 py-2"
            >
              <CheckCircleIcon className="h-5 w-5 mr-2" /> Following
            </button>
          ) : (
            <button
              onClick={() => mutation.mutate()}
              className="bg-gray-100 flex items-center font-semibold rounded-md px-3 py-2"
            >
              <UserAddIcon className="h-5 w-5 mr-2" /> Follow
            </button>
          )
        ) : (
          <Link href="/login">
            <button className="bg-gray-100 flex items-center font-semibold rounded-md px-3 py-2">
              <LoginIcon className="h-5 w-5 mr-2" /> Log In
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
