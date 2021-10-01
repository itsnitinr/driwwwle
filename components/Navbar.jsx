import Link from 'next/link';
import Image from 'next/image';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  BellIcon,
  MenuIcon,
  XIcon,
  PlusIcon,
  ChatAlt2Icon,
} from '@heroicons/react/outline';

import Search from './Search';

import { logoutUser } from '../utils/auth';

const navigation = [
  { name: 'Home', href: '/home' },
  { name: 'Feed', href: '/feed' },
  { name: 'Search', href: '/search' },
  { name: 'Announcements', href: '/announcements' },
];

const Navbar = ({ user, currentPath }) => {
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="container mx-auto px-2 md:px-10 lg:px-12">
            <div className="flex justify-between h-16">
              <div className="flex px-2 md:px-0">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/home">
                    <img
                      className="block lg:hidden h-10 w-auto cursor-pointer"
                      src="/logo.svg"
                      alt="Driwwwle"
                    />
                  </Link>
                  <Link href="/home">
                    <img
                      className="hidden lg:block h-14 w-auto cursor-pointer"
                      src="/logo-full.png"
                      alt="Driwwwle"
                    />
                  </Link>
                </div>
                <div className="hidden lg:ml-6 lg:flex lg:space-x-4">
                  {navigation.map((link) => (
                    <Link key={link.name} href={link.href}>
                      <a
                        className={`${
                          currentPath === link.href
                            ? 'border-pink-500 text-gray-900 font-semibold'
                            : 'border-transparent hover:text-pink-500 text-gray-500 font-medium'
                        } inline-flex items-center px-1 pt-1 border-b-2 text-sm`}
                      >
                        {link.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
              <Search />
              <div className="flex items-center lg:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              {user ? (
                <>
                  <div className="hidden lg:ml-4 lg:flex lg:items-center">
                    <Link href="/messages">
                      <button className="flex-shrink-0 relative bg-white p-1 mr-2 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                        <span className="sr-only">View messages</span>
                        <ChatAlt2Icon className="h-6 w-6" aria-hidden="true" />
                        {user.unreadMessage && (
                          <div className="absolute top-1 right-2 bg-pink-600 h-2 w-2 rounded-full"></div>
                        )}
                      </button>
                    </Link>
                    <Link href="/notifications">
                      <button className="flex-shrink-0 relative bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                        {user.unreadNotification && (
                          <div className="absolute top-1 right-2 bg-pink-600 h-2 w-2 rounded-full"></div>
                        )}
                      </button>
                    </Link>
                    <Menu as="div" className="ml-4 relative flex-shrink-0">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                              <span className="sr-only">Open user menu</span>
                              <Image
                                className="h-8 w-8 rounded-full object-cover"
                                src={user.profilePicUrl}
                                alt={user.name}
                                height={32}
                                width={32}
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                            >
                              <Menu.Item>
                                <Link href={`/${user.username}`}>
                                  <a className="block hover:bg-gray-100 px-4 py-2 text-sm text-gray-700">
                                    Your Profile
                                  </a>
                                </Link>
                              </Menu.Item>
                              <Menu.Item>
                                <Link href="/settings">
                                  <a className="block hover:bg-gray-100 px-4 py-2 text-sm text-gray-700">
                                    Settings
                                  </a>
                                </Link>
                              </Menu.Item>
                              <Menu.Item>
                                <a
                                  onClick={logoutUser}
                                  className="block hover:bg-gray-100 px-4 cursor-pointer py-2 text-sm text-gray-700"
                                >
                                  Sign out
                                </a>
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                    <Link href="/posts/new">
                      <a className="bg-pink-500 hover:bg-pink-600 transition rounded-md text-white px-3 h-9 ml-5 flex items-center">
                        <PlusIcon className="h-4 w-4 mr-1" />
                        <p className="text-sm">New Post</p>
                      </a>
                    </Link>
                  </div>
                </>
              ) : (
                <div className="space-x-4 flex items-center ml-4">
                  <Link href="/login">
                    <a className="hidden sm:flex font-semibold text-gray-600 text-sm">
                      Log In
                    </a>
                  </Link>
                  <Link href="/signup">
                    <a className="hidden sm:flex bg-pink-500 hover:bg-pink-600 transition text-white font-semibold text-sm px-3 py-2 rounded-md">
                      Sign Up
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <Disclosure.Panel className="lg:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((link) => (
                <Link key={link.name} href={link.href}>
                  <a
                    className={
                      currentPath === link.href
                        ? 'bg-pink-50 border-pink-500 text-pink-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                    }
                  >
                    {link.name}
                  </a>
                </Link>
              ))}
            </div>
            {user ? (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-10 w-10 rounded-full object-cover"
                      src={user.profilePicUrl}
                      alt={user.name}
                      height={48}
                      width={48}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user.email}
                    </div>
                  </div>
                  <div className="ml-auto">
                    <Link href="/messages">
                      <button className="relative flex-shrink-0 mr-1 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                        <span className="sr-only">View messages</span>
                        <ChatAlt2Icon className="h-6 w-6" aria-hidden="true" />
                        {user.unreadMessage && (
                          <div className="absolute top-1 right-2 bg-pink-600 h-2 w-2 rounded-full"></div>
                        )}
                      </button>
                    </Link>
                    <Link href="/notifications">
                      <button className="relative flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                        {user.unreadNotification && (
                          <div className="absolute top-1 right-2 bg-pink-600 h-2 w-2 rounded-full"></div>
                        )}
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link href={`/${user.username}`}>
                    <a className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                      Your Profile
                    </a>
                  </Link>
                  <Link href="/settings">
                    <a className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                      Settings
                    </a>
                  </Link>
                  <a
                    onClick={logoutUser}
                    className="block cursor-pointer px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Sign out
                  </a>
                  <Link href="/posts/new">
                    <a className="bg-pink-500 hover:bg-pink-600 transition rounded text-white mx-4 py-2 font-semibold flex items-center justify-center">
                      <PlusIcon className="h-4 w-4 mr-1" />
                      <p className="text-sm">New Post</p>
                    </a>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-200 flex flex-col space-2 items-center px-4">
                <Link href="/login">
                  <a className="font-semibold text-pink-600 text-center w-full py-2">
                    Log In
                  </a>
                </Link>
                <Link href="/signup">
                  <a className="bg-pink-500 rounded font-semibold text-white text-center w-full py-2">
                    Sign Up
                  </a>
                </Link>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
