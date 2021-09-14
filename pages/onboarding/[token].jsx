import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { GoBrowser } from 'react-icons/go';
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
  AiOutlineLoading,
} from 'react-icons/ai';

import { onboardUser } from '../../utils/auth';

const Onboarding = () => {
  const router = useRouter();
  const { token } = router.query;

  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);
  const [techStack, setTechStack] = useState('');
  const [social, setSocial] = useState({
    github: '',
    website: '',
    linkedin: '',
    twitter: '',
    instagram: '',
    youtube: '',
  });

  const [loading, setLoading] = useState(false);

  const { github, website, linkedin, twitter, instagram, youtube } = social;

  const handleSocialChange = (e) => {
    setSocial((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append('profilePic', image);
    formdata.append('bio', bio);
    formdata.append(
      'techStack',
      JSON.stringify(techStack.split(',').map((item) => item.trim()))
    );
    formdata.append('social', JSON.stringify(social));

    await onboardUser(token, formdata, setLoading, toast);
  };

  return (
    <div className="p-6">
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-pink-600">
                Let's build your profile
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={onSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Photo
                    </label>
                    <div className="mt-1 flex items-center">
                      <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        {image ? (
                          <img
                            className="object-cover h-full w-full"
                            src={URL.createObjectURL(image)}
                          />
                        ) : (
                          <svg
                            className="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        )}
                      </span>
                      <label className="bg-gray-50 border-2 border-pink-600 ml-4 p-2 text-pink-600 font-medium rounded-md cursor-pointer text-sm shadow hover:bg-pink-100">
                        <input
                          type="file"
                          onChange={(e) => setImage(e.target.files[0])}
                          accept="image/*"
                          hidden
                        />
                        Choose New Image
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="bio"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Bio<span className="text-red-400">*</span>
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          id="bio"
                          className="focus:ring-pink-500 focus:border-pink-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                          placeholder="I'm a full stack developer!"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="tech-stack"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tech Stack<span className="text-red-400">*</span>
                      </label>
                      <small>
                        Please seperate each technology with a comma
                      </small>
                      <div className="mt-3 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          id="tech-stack"
                          className="focus:ring-pink-500 focus:border-pink-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                          placeholder="Node.js, React, Next.js"
                          value={techStack}
                          onChange={(e) => setTechStack(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-3 text-sm font-medium text-gray-700">
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
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex relative justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    Complete Onboarding
                    {loading && (
                      <span className="flex items-center mx-1">
                        <AiOutlineLoading
                          className="h-5 w-5 text-gray-100 animate-spin ml-2 mr-0"
                          aria-hidden="true"
                        />
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export function getServerSideProps() {
  return { props: { title: 'Onboarding' } };
}

export default Onboarding;
