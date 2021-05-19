import { ShareIcon, ThumbUpIcon } from '@heroicons/react/solid';

const DeckCards = ({ data }) => {
  return (
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
              <p className='mt-2 space-y-4 text-gray-700'>{post.content}</p>
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
                      <ThumbUpIcon className='w-5 h-5' aria-hidden='true' />
                      <span className='font-medium text-gray-900'>29</span>
                      <span className='sr-only'>likes</span>
                    </button>
                  </span>
                  <span className='inline-flex items-center text-sm'>
                    <button className='inline-flex space-x-2 text-gray-400 hover:text-gray-500'>
                      <ShareIcon className='w-5 h-5' aria-hidden='true' />
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
  );
};

export default DeckCards;
