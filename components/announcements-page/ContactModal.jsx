import { Fragment } from 'react';
import { SupportIcon } from '@heroicons/react/outline';
import { Dialog, Transition } from '@headlessui/react';
import { FaDiscord, FaTwitter, FaGithub } from 'react-icons/fa';

const BadgeModal = ({ open, setOpen, badge }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={open}
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
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center rounded-full">
                  <SupportIcon className="h-16 w-16 text-pink-600" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Reach Out To Us
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      We're available on multiple platforms. Connect with us for
                      feedback, suggestions or queries.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <div className="flex mb-3 space-x-2">
                  <a
                    href="https://discord.gg/YER2pF6CZS"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center w-full justify-center rounded-md cursor-pointer border border-transparent shadow-sm px-4 py-2 bg-gray-700 text-base font-medium text-white hover:bg-gray-800 focus:outline-none sm:text-sm"
                  >
                    <FaDiscord className="h-5 w-5" />
                  </a>
                  <a
                    href="https://twitter.com/driwwwle"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full justify-center rounded-md border cursor-pointer border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none sm:text-sm"
                  >
                    <FaTwitter className="h-5 w-5" />
                  </a>
                  <a
                    href="https://github.com/itsnitinr/driwwwle-v2"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full justify-center rounded-md border cursor-pointer border-transparent shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-gray-900 focus:outline-none sm:text-sm"
                  >
                    <FaGithub className="h-5 w-5" />
                  </a>
                </div>
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-pink-600 text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default BadgeModal;
