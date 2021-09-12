import axios from 'axios';
import cookie from 'js-cookie';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { AiOutlineLoading } from 'react-icons/ai';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

import baseURL from '../../utils/baseURL';

const PasswordSettings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const mutation = useMutation(async () => {
    await axios.put(
      `${baseURL}/api/auth/password`,
      { currentPassword, newPassword },
      {
        headers: {
          Authorization: cookie.get('token'),
        },
      }
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      return toast.error('Passwords do not match');
    }
    try {
      await mutation.mutateAsync();
      toast.success('Your password has been updated');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="divide-y divide-gray-200 lg:col-span-9"
    >
      <div className="py-6 px-4 sm:p-6 lg:pb-8">
        <div>
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Password Settings
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            You will need to enter your current password before you can update
            your password.
          </p>
        </div>
        <div className="mt-6 flex flex-col lg:flex-row">
          <div className="flex-grow space-y-4">
            <div>
              <label
                htmlFor="current-password"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <div className="relative mt-1 rounded-md shadow-sm flex">
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
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
                  type={showCurrentPassword ? 'text' : 'password'}
                  name="currentPassword"
                  id="current-password"
                  className="focus:ring-pink-500 focus:border-pink-500 flex-grow block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="relative mt-1 rounded-md shadow-sm flex">
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
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
                  type={showNewPassword ? 'text' : 'password'}
                  name="newPassword"
                  id="new-password"
                  className="focus:ring-pink-500 focus:border-pink-500 flex-grow block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="confirm-new-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <div className="relative mt-1 rounded-md shadow-sm flex">
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() =>
                    setShowConfirmNewPassword(!showConfirmNewPassword)
                  }
                >
                  {showConfirmNewPassword ? (
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
                  type={showConfirmNewPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  id="confirm-new-password"
                  className="focus:ring-pink-500 focus:border-pink-500 flex-grow block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
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

export default PasswordSettings;
