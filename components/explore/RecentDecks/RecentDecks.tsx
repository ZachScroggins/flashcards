import { PlusIcon } from '@heroicons/react/solid';

const RecentDecks = ({ data, error, status }) => {
  return (
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
  );
};

export default RecentDecks;
