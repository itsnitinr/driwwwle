import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { AiOutlineLoading } from 'react-icons/ai';
import { MailIcon } from '@heroicons/react/outline';

import baseURL from '../utils/baseURL';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const mutation = useMutation(async () => {
    const { data } = await axios.post(`${baseURL}/api/auth/forgot-password`, {
      email,
    });
    return data;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync();
      toast.success('Please check your email to reset your password');
      setEmail('');
    } catch (err) {
      toast.error(
        err.response?.data?.msg || 'There was an error. Try again later.'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot Password?
          </h2>
          <p className="text-center text-pink-600 mt-2 mb-6 font-semibold text-md">
            Enter your email to receive the passoword reset link.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
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
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="/signup">
                <a className="font-medium text-pink-600 hover:text-pink-500">
                  Don't have an account?
                </a>
              </Link>
            </div>
            <div className="text-sm">
              <Link href="/login">
                <a className="font-medium text-pink-600 hover:text-pink-500">
                  Login instead
                </a>
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mutation.isLoading && (
                <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                  <AiOutlineLoading
                    className="h-5 w-5 text-gray-100 animate-spin"
                    aria-hidden="true"
                  />
                </span>
              )}
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export function getServerSideProps() {
  return { props: { title: 'Forgot Password?' } };
}

export default ForgotPassword;
