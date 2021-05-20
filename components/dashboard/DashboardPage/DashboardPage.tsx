import Head from 'next/head';
import { useQueryClient } from 'react-query';
import { useDeletePostMutation, useFeedQuery } from 'lib/generated';
import client from 'lib/graphql/gql-request-client';
import { classNames } from 'lib/utils/classNames';

const tabs = [
  { name: 'Decks', href: '#', current: true },
  { name: 'Folders', href: '#', current: false },
  { name: 'Likes', href: '#', current: false },
];

const DashboardPage = () => {
  const queryClient = useQueryClient();

  const { data, status, error } = useFeedQuery(client);

  const { mutate } = useDeletePostMutation(client, {
    onSuccess: () => queryClient.invalidateQueries('Feed'),
  });

  return (
    <>
      <Head>
        <title>Flash</title>
      </Head>

      <main className='col-span-9 px-4 sm:px-0 xl:col-span-10'>
        <div className='pt-8 sticky left-0 bg-gray-100 top-[4.5rem] border-b border-gray-200 sm:pb-0'>
          <h3 className='text-lg font-medium leading-6 text-gray-900'>
            User Name
          </h3>
          <div className='mt-3 sm:mt-4'>
            <div className=''>
              <nav className='flex -mb-px space-x-8'>
                {tabs.map(tab => (
                  <a
                    key={tab.name}
                    href={tab.href}
                    className={classNames(
                      tab.current
                        ? 'border-rose-500 text-rose-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                      'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm'
                    )}
                    aria-current={tab.current ? 'page' : undefined}
                  >
                    {tab.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className='mt-4'>
          {status === 'loading' ? (
            <p>Loading...</p>
          ) : status === 'error' ? (
            <p>Error: {error.message}</p>
          ) : (
            <>
              <ul className='space-y-1'>
                {data.feed.map(post => {
                  return (
                    <li key={post.id}>
                      {post.id}. <span>{post.title} |</span>{' '}
                      <span>
                        <button
                          className='underline'
                          onClick={() =>
                            data.feed && mutate({ postId: `${post.id}` })
                          }
                        >
                          Delete
                        </button>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
