import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
import { Popover, Menu, Transition } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/solid';
import { BellIcon, FireIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import {
  FiCompass,
  FiGithub,
  FiHelpCircle,
  FiHome,
  FiLayout,
  FiNavigation,
  FiZap,
} from 'react-icons/fi';
import { classNames } from 'lib/utils/classNames';
import { NextLink } from 'components/common';
import { useRouter } from 'next/dist/client/router';
import { useCreateDraftMutationMutation } from 'lib/generated';
import client from 'lib/graphql/gql-request-client';
import { useQueryClient } from 'react-query';

const navigation = [
  { name: 'Home', href: '/', icon: FiHome },
  { name: 'Dashboard', href: '/dashboard', icon: FiLayout },
  { name: 'Explore', href: '/explore', icon: FiCompass },
  {
    name: 'GitHub',
    href: 'https://github.com/ZachScroggins/flashcards',
    icon: FiGithub,
  },
];
const authNavigation = [
  { name: 'Home', href: '/', icon: FiHome },
  { name: 'Test', href: '/test', icon: FireIcon },
  { name: 'Explore', href: '/explore', icon: FiCompass },
  {
    name: 'GitHub',
    href: 'https://github.com/ZachScroggins/flashcards',
    icon: FiGithub,
  },
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
];
const communities = [
  { name: 'Movies', href: '#' },
  { name: 'Food', href: '#' },
  { name: 'Sports', href: '#' },
  { name: 'Animals', href: '#' },
  { name: 'Science', href: '#' },
  { name: 'Dinosaurs', href: '#' },
  { name: 'Talents', href: '#' },
  { name: 'Gaming', href: '#' },
];

const Layout = ({ children }) => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [currentIndex, setCurrentIndex] = useState(0);

  const queryClient = useQueryClient();
  const { mutate: create } = useCreateDraftMutationMutation(client, {
    onSuccess: () => queryClient.invalidateQueries('Feed'),
  });

  useEffect(() => {
    switch (router.pathname) {
      case '/':
        setCurrentIndex(0);
        break;
      case '/dashboard':
        setCurrentIndex(1);
        break;
      case '/explore':
        setCurrentIndex(2);
        break;
      default:
        setCurrentIndex(-1);
        break;
    }
  }, [router.pathname]);

  return (
    <div className='min-h-screen bg-gray-100'>
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover
        as='header'
        className={({ open }) =>
          classNames(
            open ? 'inset-0 overflow-y-auto' : 'h-[4.5rem]',
            'bg-white shadow-sm z-40 fixed w-full lg:overflow-y-visible'
          )
        }
      >
        {({ open }) => (
          <>
            <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
              <div className='relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8'>
                <div className='flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2'>
                  <div className='flex items-center flex-shrink-0'>
                    <Link href='/'>
                      <a className='flex items-center text-3xl align-middle text-rose-500'>
                        <FiZap className='' aria-hidden='true' />
                        <span className='hidden ml-1 font-mono lg:block'>
                          Flash
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
                <div className='flex-1 min-w-0 md:px-8 lg:px-0 xl:col-span-6'>
                  <div className='flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0'>
                    <div className='w-full'>
                      <label htmlFor='search' className='sr-only'>
                        Search
                      </label>
                      <div className='relative'>
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                          <SearchIcon
                            className='w-5 h-5 text-gray-400'
                            aria-hidden='true'
                          />
                        </div>
                        <input
                          id='search'
                          name='search'
                          className='block w-full py-2 pl-10 pr-3 text-sm placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm'
                          placeholder='Search'
                          type='search'
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden'>
                  {/* Mobile menu button */}
                  <Popover.Button className='inline-flex items-center justify-center p-2 -mx-2 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500'>
                    <span className='sr-only'>Open menu</span>
                    {open ? (
                      <XIcon className='block w-6 h-6' aria-hidden='true' />
                    ) : (
                      <MenuIcon className='block w-6 h-6' aria-hidden='true' />
                    )}
                  </Popover.Button>
                </div>
                <div className='hidden lg:flex lg:items-center lg:justify-end xl:col-span-4'>
                  <a
                    href='#'
                    className='text-sm font-medium text-gray-900 hover:underline'
                  >
                    Try Demo
                  </a>

                  {session && (
                    <>
                      <a
                        href='#'
                        className='flex-shrink-0 p-1 ml-5 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500'
                      >
                        <span className='sr-only'>View Help</span>
                        <FiHelpCircle className='w-6 h-6' aria-hidden='true' />
                      </a>
                      {/* Profile dropdown */}
                      <Menu as='div' className='relative flex-shrink-0 ml-5'>
                        {({ open }) => (
                          <>
                            <div>
                              <Menu.Button className='flex bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500'>
                                <span className='sr-only'>Open user menu</span>
                                <img
                                  className='w-8 h-8 rounded-full'
                                  src={session?.user?.image}
                                  alt={`${session?.user?.name} Profile Picture`}
                                />
                              </Menu.Button>
                            </div>
                            <Transition
                              show={open}
                              as={Fragment}
                              enter='transition ease-out duration-100'
                              enterFrom='transform opacity-0 scale-95'
                              enterTo='transform opacity-100 scale-100'
                              leave='transition ease-in duration-75'
                              leaveFrom='transform opacity-100 scale-100'
                              leaveTo='transform opacity-0 scale-95'
                            >
                              <Menu.Items
                                static
                                className='absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                              >
                                {userNavigation.map(item => (
                                  <Menu.Item key={item.name}>
                                    {({ active }) => (
                                      <a
                                        href={item.href}
                                        className={classNames(
                                          active ? 'bg-gray-100' : '',
                                          'block py-2 px-4 text-sm text-gray-700'
                                        )}
                                      >
                                        {item.name}
                                      </a>
                                    )}
                                  </Menu.Item>
                                ))}
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => signOut()}
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block py-2 px-4 w-full text-left text-sm text-gray-700'
                                      )}
                                    >
                                      Sign Out
                                    </button>
                                  )}
                                </Menu.Item>
                              </Menu.Items>
                            </Transition>
                          </>
                        )}
                      </Menu>
                    </>
                  )}

                  <button
                    type='button'
                    className='inline-flex items-center px-4 py-2 ml-6 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500'
                    onClick={() => {
                      if (session) {
                        create({
                          authorId: session.user.id,
                          title: 'New Post',
                          content: 'This post was generated by the button',
                        });
                      } else {
                        signIn();
                      }
                    }}
                  >
                    {session ? 'Create' : 'Sign In/Up'}
                  </button>
                </div>
              </div>
            </div>

            <Popover.Panel as='nav' className='lg:hidden' aria-label='Global'>
              <div className='max-w-3xl px-2 pt-2 pb-3 mx-auto space-y-1 sm:px-4'>
                {navigation.map((item, index) => (
                  <Popover.Button as={Fragment} key={item.name}>
                    <NextLink
                      href={item.href}
                      aria-current={currentIndex === index ? 'page' : undefined}
                      className={classNames(
                        currentIndex === index
                          ? 'bg-gray-100 text-gray-900'
                          : 'hover:bg-gray-50',
                        'block rounded-md py-2 px-3 text-base font-medium'
                      )}
                    >
                      {item.name}
                    </NextLink>
                  </Popover.Button>
                ))}
              </div>
              <div className='pt-4 pb-3 border-t border-gray-200'>
                {session ? (
                  <>
                    <div className='flex items-center max-w-3xl px-4 mx-auto sm:px-6'>
                      <div className='flex-shrink-0'>
                        <img
                          className='w-10 h-10 rounded-full'
                          src={session?.user?.image}
                          alt=''
                        />
                      </div>
                      <div className='ml-3'>
                        <div className='text-base font-medium text-gray-800'>
                          {session?.user?.name}
                        </div>
                        <div className='text-sm font-medium text-gray-500'>
                          {session?.user?.email}
                        </div>
                      </div>
                      <button
                        type='button'
                        className='flex-shrink-0 p-1 ml-auto text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500'
                      >
                        <span className='sr-only'>View notifications</span>
                        <BellIcon className='w-6 h-6' aria-hidden='true' />
                      </button>
                    </div>
                    <div className='max-w-3xl px-2 mx-auto mt-3 space-y-1 sm:px-4'>
                      {userNavigation.map(item => (
                        <Popover.Button
                          as='a'
                          key={item.name}
                          href={item.href}
                          className='block px-3 py-2 text-base font-medium text-gray-500 rounded-md hover:bg-gray-50 hover:text-gray-900'
                        >
                          {item.name}
                        </Popover.Button>
                      ))}
                      <button
                        type='button'
                        className='block w-full px-3 py-2 text-base font-medium text-left text-gray-500 rounded-md hover:bg-gray-50 hover:text-gray-900'
                        onClick={() => {
                          signOut();
                        }}
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                ) : (
                  <div className='max-w-3xl px-2 mx-auto space-y-1 sm:px-4'>
                    <button
                      type='button'
                      onClick={() => {
                        signIn();
                      }}
                      className='block w-full px-3 py-2 text-base font-medium text-left text-gray-500 rounded-md hover:bg-gray-50 hover:text-gray-900'
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>

      <div className='pt-[4.5rem]'>
        <div className='max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8'>
          <div className='hidden lg:block lg:col-span-3 xl:col-span-2'>
            <nav
              aria-label='Sidebar'
              className='sticky pt-6 pb-24 scroll-container overflow-y-auto divide-y divide-gray-300 top-[4.5rem]'
            >
              <div className='pb-8 space-y-1'>
                {navigation.map((item, index) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      className={classNames(
                        currentIndex === index
                          ? 'bg-gray-200 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50',
                        'group flex items-center px-3 py-2 text-sm font-medium rounded-md'
                      )}
                      aria-current={currentIndex === index ? 'page' : undefined}
                    >
                      <item.icon
                        className={classNames(
                          currentIndex === index
                            ? 'text-gray-500'
                            : 'text-gray-400 group-hover:text-gray-500',
                          'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                        )}
                        aria-hidden='true'
                      />
                      <span className='truncate'>{item.name}</span>
                    </a>
                  </Link>
                ))}
              </div>
              <div className='pt-10'>
                <p
                  className='px-3 text-xs font-semibold tracking-wider text-gray-500 uppercase'
                  id='communities-headline'
                >
                  Categories
                </p>
                <div
                  className='mt-3 space-y-2'
                  aria-labelledby='communities-headline'
                >
                  {communities.map(community => (
                    <a
                      key={community.name}
                      href={community.href}
                      className='flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md group hover:text-gray-900 hover:bg-gray-50'
                    >
                      <span className='truncate'>{community.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
