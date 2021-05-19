import Head from 'next/head';
import { PlusIcon, ShareIcon, ThumbUpIcon } from '@heroicons/react/solid';
import { classNames } from 'lib/utils/classNames';
import { useFeedQuery } from 'lib/generated';
import client from 'lib/graphql/gql-request-client';

const tabs = [
  { name: 'Decks', href: '#', current: true },
  { name: 'Folders', href: '#', current: false },
  { name: 'Likes', href: '#', current: false },
];
const communities = [
  { name: 'Movies', href: '#', current: true },
  { name: 'Food', href: '#', current: false },
  { name: 'Sports', href: '#', current: false },
  { name: 'Animals', href: '#', current: false },
  { name: 'Science', href: '#', current: false },
  { name: 'Dinosaurs', href: '#', current: false },
  { name: 'Talents', href: '#', current: false },
  { name: 'Gaming', href: '#', current: false },
];

const ExplorePage = () => {
  const { data, status, error } = useFeedQuery(client);

  return (
    <>
      <Head>
        <title>Flash</title>
      </Head>

      <main className='pt-6 lg:col-span-9 xl:col-span-6'>
        <div className='px-4 sm:px-0'>
          <div className=''>
            <label htmlFor='question-tabs' className='sr-only'>
              Select a tab
            </label>
            <select
              id='question-tabs'
              className='block w-full text-base font-medium text-gray-900 border-gray-300 rounded-md shadow-sm focus:border-rose-500 focus:ring-rose-500'
              defaultValue={tabs.find(tab => tab.current).name}
            >
              <option>All</option>
              <option>Recent</option>
              <option>Trending</option>
              {communities.map(tab => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className='hidden'>
            <nav
              className='relative z-0 flex divide-x divide-gray-200 rounded-lg shadow'
              aria-label='Tabs'
            >
              {tabs.map((tab, tabIdx) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  aria-current={tab.current ? 'page' : undefined}
                  className={classNames(
                    tab.current
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-700',
                    tabIdx === 0 ? 'rounded-l-lg' : '',
                    tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                    'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                  )}
                >
                  <span>{tab.name}</span>
                  <span
                    aria-hidden='true'
                    className={classNames(
                      tab.current ? 'bg-rose-500' : 'bg-transparent',
                      'absolute inset-x-0 bottom-0 h-0.5'
                    )}
                  />
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className='px-4 mt-4 mb-6 sm:px-0'>
          <h1 className='sr-only'>Recent Posts</h1>
          {status === 'loading' ? (
            <p>Loading...</p>
          ) : status === 'error' ? (
            <p>Error: {error.message}</p>
          ) : (
            <ul className='space-y-4'>
              {data.feed.map(post => {
                return (
                  <li
                    key={post.id}
                    className='px-4 py-6 bg-white rounded-lg shadow sm:p-6'
                  >
                    <article aria-labelledby={'post-title-' + post.id}>
                      <span className='text-sm'>12 Items</span>
                      <h2
                        id={'post-title-' + post.id}
                        className='text-lg font-medium text-gray-900'
                      >
                        {post.title}
                      </h2>
                      <p className='mt-2 space-y-4 text-gray-700'>
                        {post.content}
                      </p>
                      <div className='flex justify-between mt-6 space-x-8'>
                        <div className='flex space-x-3'>
                          <div className='flex-shrink-0'>
                            <img
                              className='w-8 h-8 rounded-full'
                              src={post.author.image}
                              alt=''
                            />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <p className='flex items-center h-full text-sm font-medium text-gray-900'>
                              <a href='#' className='hover:underline'>
                                {post.author.name}
                              </a>
                            </p>
                          </div>
                        </div>
                        <div className='flex space-x-6 text-sm'>
                          <span className='inline-flex items-center text-sm'>
                            <button className='inline-flex space-x-2 text-gray-400 hover:text-gray-500'>
                              <ThumbUpIcon
                                className='w-5 h-5'
                                aria-hidden='true'
                              />
                              <span className='font-medium text-gray-900'>
                                29
                              </span>
                              <span className='sr-only'>likes</span>
                            </button>
                          </span>
                          <span className='inline-flex items-center text-sm'>
                            <button className='inline-flex space-x-2 text-gray-400 hover:text-gray-500'>
                              <ShareIcon
                                className='w-5 h-5'
                                aria-hidden='true'
                              />
                              {/* <span className='font-medium text-gray-900'>
                                Share
                              </span> */}
                            </button>
                          </span>
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </main>

      <aside className='hidden xl:block xl:col-span-4'>
        <div className='sticky pt-6 scroll-container pb-24 overflow-y-auto space-y-4 top-[4.5rem]'>
          <section aria-labelledby='who-to-follow-heading'>
            <div className='bg-white rounded-lg shadow'>
              <div className='p-6'>
                <h2
                  id='who-to-follow-heading'
                  className='text-base font-medium text-gray-900'
                >
                  Most recent
                </h2>
                <div className='flow-root mt-6'>
                  {status === 'loading' ? (
                    <p>Loading...</p>
                  ) : status === 'error' ? (
                    <p>Error: {error.message}</p>
                  ) : (
                    <ul className='-my-4 divide-y divide-gray-200'>
                      {data.feed.slice(0, 4).map(post => {
                        return (
                          <li
                            key={post.id}
                            className='flex items-center py-4 space-x-3'
                          >
                            <div className='flex-shrink-0'>
                              <img
                                className='w-8 h-8 rounded-full'
                                src={post.author.image}
                                alt=''
                              />
                            </div>
                            <div className='flex-1 min-w-0'>
                              <p className='text-sm font-medium text-gray-900 truncate'>
                                <a href='#'>{post.title}</a>
                              </p>
                              <p className='text-sm text-gray-500'>
                                <a href='#'>{post.author.name}</a>
                              </p>
                            </div>
                            <div className='flex-shrink-0'>
                              <button
                                type='button'
                                className='inline-flex items-center px-3 py-0.5 rounded-full bg-rose-50 text-sm font-medium text-rose-700 hover:bg-rose-100'
                              >
                                <PlusIcon
                                  className='-ml-1 mr-0.5 h-5 w-5 text-rose-400'
                                  aria-hidden='true'
                                />
                                <span>Follow</span>
                              </button>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
                <div className='mt-6'>
                  <a
                    href='#'
                    className='block w-full px-4 py-2 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50'
                  >
                    View all
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section aria-labelledby='trending-heading'>
            <div className='bg-white rounded-lg shadow'>
              <div className='p-6'>
                <h2
                  id='trending-heading'
                  className='text-base font-medium text-gray-900'
                >
                  Trending
                </h2>
                <div className='flow-root mt-6'>
                  {status === 'loading' ? (
                    <p>Loading...</p>
                  ) : status === 'error' ? (
                    <p>Error: {error.message}</p>
                  ) : (
                    <ul className='-my-4 divide-y divide-gray-200'>
                      {data.feed.slice(0, 4).map(post => {
                        return (
                          <li key={post.id} className='flex py-4 space-x-3'>
                            <div className='flex-shrink-0'>
                              <img
                                className='w-8 h-8 rounded-full'
                                src={post.author.image}
                                alt={post.author.name}
                              />
                            </div>
                            <div className='flex-1 min-w-0'>
                              <p className='text-sm font-medium text-gray-800 truncate'>
                                {post.title}
                              </p>
                              <p className='text-sm text-gray-800 truncate'>
                                {post.content}
                              </p>
                              <div className='flex mt-2'>
                                <span className='inline-flex items-center text-sm'>
                                  <button className='inline-flex space-x-2 text-gray-400 hover:text-gray-500'>
                                    <ThumbUpIcon
                                      className='w-5 h-5'
                                      aria-hidden='true'
                                    />
                                    <span className='font-medium text-gray-900'>
                                      8
                                    </span>
                                  </button>
                                </span>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
                <div className='mt-6'>
                  <a
                    href='#'
                    className='block w-full px-4 py-2 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50'
                  >
                    View all
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </aside>
    </>
  );
};

export default ExplorePage;
