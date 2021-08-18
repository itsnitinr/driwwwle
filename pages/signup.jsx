import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  LockClosedIcon,
  MailIcon,
  DotsCircleHorizontalIcon,
  UserCircleIcon,
  EyeIcon,
  EyeOffIcon,
  CheckIcon,
  XIcon,
} from '@heroicons/react/outline';

const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

const Signup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [username, setUsername] = useState('');
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  const { name, email, password } = user;

  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  useEffect(() => {
    const isUser = Object.values({ name, email, password }).every((item) =>
      Boolean(item)
    );
    isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to Driwwwle
          </h2>
          <p className="text-center text-pink-600 mt-2 mb-6 font-semibold text-md">
            We're thrilled to have you onboard
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserCircleIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="John Doe"
                  value={name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {username === '' ? (
                    <DotsCircleHorizontalIcon
                      className={`h-5 w-5 text-gray-400 ${
                        usernameLoading ? 'animate-spin' : ''
                      }`}
                      aria-hidden="true"
                    />
                  ) : usernameAvailable ? (
                    <CheckIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <XIcon className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className={`focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${
                    username !== '' && !usernameAvailable ? 'bg-red-100' : ''
                  }`}
                  placeholder="something_legendary"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (usernameRegex.test(e.target.value)) {
                      setUsernameAvailable(true);
                    } else {
                      setUsernameAvailable(false);
                    }
                  }}
                />
              </div>
              {username !== '' && !usernameAvailable && (
                <small className="text-xs text-red-600">
                  This username is invalid or not available
                </small>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="you@example.com"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <EyeIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  value={password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="/login">
                <a className="font-medium text-pink-600 hover:text-pink-500">
                  Already have an account?
                </a>
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={submitDisabled || !usernameAvailable}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-pink-500 group-hover:text-pink-400"
                  aria-hidden="true"
                />
              </span>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export function getStaticProps() {
  return { props: { title: 'Sign Up to Driwwwle' } };
}

export default Signup;