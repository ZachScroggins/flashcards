import { ThumbUpIcon } from '@heroicons/react/solid';

const TrendingDecks = ({ data, error, status }) => {
  return (
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
  );
};

export default TrendingDecks;
