import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { AiOutlineLoading } from 'react-icons/ai';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

import baseURL from '../../utils/baseURL';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const { token } = router.query;

  const mutation = useMutation(async () => {
    const { data } = await axios.put(
      `${baseURL}/api/auth/reset-password/${token}`,
      {
        password,
      }
    );
    return data;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    try {
      await mutation.mutateAsync();
      toast.success('Your password has been updated');
      router.push('/login');
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
            Reset Password
          </h2>
          <p className="text-center text-pink-600 mt-2 mb-6 font-semibold text-md">
            Enter your new password
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
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
                  className="focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
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
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  id="confirm-password"
                  className="focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
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
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export function getServerSideProps() {
  return { props: { title: 'Reset Your Password' } };
}

export default ResetPassword;
