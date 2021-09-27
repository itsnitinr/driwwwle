import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { HeartIcon } from '@heroicons/react/outline';

import baseURL from '../utils/baseURL';

const LikeModal = ({ open, setOpen, postId }) => {
  const cancelButtonRef = useRef(null);

  const { data, isLoading } = useQuery(
    ['likes', postId],
    async () => {
      const { data } = await axios.get(`${baseURL}/api/posts/like/${postId}`);
      return data;
    },
    {
      enabled: open,
    }
  );

  return (
    open && (
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-3/4">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-center border-b border-gray-200 pb-2">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-pink-100 sm:mx-0 sm:h-10 sm:w-10">
                      <HeartIcon
                        className="h-5 w-5 sm:h-6 sm:w-6 text-pink-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Likes
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className="flex flex-col mt-4">
                    {isLoading ? (
                      <p>Loading...</p>
                    ) : data.length === 0 ? (
                      <p>No likes</p>
                    ) : (
                      <div className="space-y-3">
                        {data.map((like) => (
                          <Link key={like._id} href={`/${like.user.username}`}>
                            <div
                              onClick={() => setOpen(false)}
                              className="flex items-center cursor-pointer hover:text-pink-600"
                            >
                              <Image
                                src={like.user.profilePicUrl}
                                width={30}
                                height={30}
                                className="rounded-full object-cover"
                              />
                              <h3 className="text-lg ml-2">
                                {like.user.username}
                              </h3>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-600 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    )
  );
};

export default LikeModal;
