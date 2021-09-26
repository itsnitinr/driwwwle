import axios from 'axios';
import cookie from 'js-cookie';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from 'react-query';
import { GoBrowser } from 'react-icons/go';
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
  AiOutlineLoading,
} from 'react-icons/ai';

import baseURL from '../../utils/baseURL';

const UserSettings = ({ profile }) => {
  const [bio, setBio] = useState(profile.bio);
  const [techStack, setTechStack] = useState(() =>
    profile.techStack.join(', ')
  );
  const [social, setSocial] = useState({
    github: profile.social?.github || '',
    website: profile.social?.website || '',
    linkedin: profile.social?.linkedin || '',
    twitter: profile.social?.twitter || '',
    instagram: profile.social?.twitter || '',
    youtube: profile.social?.youtube || '',
  });

  const { github, website, linkedin, twitter, instagram, youtube } = social;

  const queryClient = useQueryClient();

  const handleSocialChange = (e) => {
    setSocial((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const mutation = useMutation(
    async () => {
      const { data } = await axios.put(
        `${baseURL}/api/profile`,
        {
          bio,
          techStack: techStack.split(',').map((item) => item.trim()),
          social,
        },
        {
          headers: {
            Authorization: cookie.get('token'),
          },
        }
      );
      return data;
    },
    {
      onSuccess: (data) => {
        toast.success('Updated profile successfully');
        queryClient.setQueryData(['profile'], data);
      },
      onError: () => {
        toast.error(err.response?.data?.msg || 'Please recheck your inputs');
      },
    }
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate();
      }}
      className="divide-y divide-gray-200 lg:col-span-9"
    >
      <div className="py-6 px-4 sm:p-6 lg:pb-8">
        <div>
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Profile Settings
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>
        <div className="mt-6 flex flex-col lg:flex-row">
          <div className="flex-grow space-y-4">
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700"
              >
                Biography
              </label>
              <div className="mt-1 rounded-md shadow-sm flex">
                <textarea
                  name="bio"
                  id="bio"
                  className="focus:ring-pink-500 focus:border-pink-500 flex-grow block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <div>
              <label
                htmlFor="techStack"
                className="block text-sm font-medium text-gray-700"
              >
                Tech Stack
              </label>
              <div className="mt-1 rounded-md shadow-sm flex">
                <input
                  type="text"
                  name="techStack"
                  id="techStack"
                  className="focus:ring-pink-500 focus:border-pink-500 flex-grow block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Social Profiles
              </label>
              <div className="grid lg:grid-cols-6 gap-x-6 gap-y-3">
                <div className="mt-1 relative rounded-md shadow-sm col-span-6 sm:col-span-3">
                  <div className="flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      <AiFillGithub
                        className="h-5 w-5 mr-2 text-gray-400"
                        aria-hidden="true"
                      />
                      github.com/
                    </span>
                    <input
                      type="text"
                      name="github"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-pink-500 focus:border-pink-500 sm:text-sm border-gray-300"
                      placeholder="GitHub username"
                      value={github}
                      onChange={handleSocialChange}
                    />
                  </div>
                </div>
                <div className="mt-1 relative rounded-md shadow-sm col-span-6 sm:col-span-3">
                  <div className="flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      <GoBrowser
                        className="h-5 w-5 mr-2 text-gray-400"
                        aria-hidden="true"
                      />
                      https://
                    </span>
                    <input
                      type="text"
                      name="website"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-pink-500 focus:border-pink-500 sm:text-sm border-gray-300"
                      placeholder="Website URL"
                      value={website}
                      onChange={handleSocialChange}
                    />
                  </div>
                </div>
                <div className="mt-1 relative rounded-md shadow-sm col-span-6 sm:col-span-3">
                  <div className="flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      <AiFillLinkedin
                        className="h-5 w-5 mr-2 text-gray-400"
                        aria-hidden="true"
                      />
                      linkedin.com/in/
                    </span>
                    <input
                      type="text"
                      name="linkedin"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-pink-500 focus:border-pink-500 sm:text-sm border-gray-300"
                      placeholder="LinkedIn username"
                      value={linkedin}
                      onChange={handleSocialChange}
                    />
                  </div>
                </div>
                <div className="mt-1 relative rounded-md shadow-sm col-span-6 sm:col-span-3">
                  <div className="flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      <AiFillTwitterCircle
                        className="h-5 w-5 mr-2 text-gray-400"
                        aria-hidden="true"
                      />
                      twitter.com/
                    </span>
                    <input
                      type="text"
                      name="twitter"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-pink-500 focus:border-pink-500 sm:text-sm border-gray-300"
                      placeholder="Twitter username"
                      value={twitter}
                      onChange={handleSocialChange}
                    />
                  </div>
                </div>
                <div className="mt-1 relative rounded-md shadow-sm col-span-6 sm:col-span-3">
                  <div className="flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      <AiFillInstagram
                        className="h-5 w-5 mr-2 text-gray-400"
                        aria-hidden="true"
                      />
                      instagram.com/
                    </span>
                    <input
                      type="text"
                      name="instagram"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-pink-500 focus:border-pink-500 sm:text-sm border-gray-300"
                      placeholder="Instagram username"
                      value={instagram}
                      onChange={handleSocialChange}
                    />
                  </div>
                </div>
                <div className="mt-1 relative rounded-md shadow-sm col-span-6 sm:col-span-3">
                  <div className="flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      <AiFillYoutube
                        className="h-5 w-5 mr-2 text-gray-400"
                        aria-hidden="true"
                      />
                      youtube.com/c/
                    </span>
                    <input
                      type="text"
                      name="youtube"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-pink-500 focus:border-pink-500 sm:text-sm border-gray-300"
                      placeholder="YT channel ID"
                      value={youtube}
                      onChange={handleSocialChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
        <button
          type="submit"
          className="ml-5 relative bg-pink-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:pointer-events-none"
          disabled={mutation.isLoading}
        >
          Save
          {mutation.isLoading && (
            <AiOutlineLoading className="h-5 w-5 ml-2 animate-spin" />
          )}
        </button>
      </div>
    </form>
  );
};

export default UserSettings;
