import { DeckCards } from 'components/explore';

const Feed = ({ data, error, status }) => {
  return (
    <div className='px-4 mt-4 mb-6 sm:px-0'>
      <h1 className='sr-only'>Explore Decks</h1>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <p>Error: {error.message}</p>
      ) : (
        <DeckCards data={data} />
      )}
    </div>
  );
};

export default Feed;
