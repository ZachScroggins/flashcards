import Head from 'next/head';
import { useFeedQuery } from 'lib/generated';
import client from 'lib/graphql/gql-request-client';
import {
  RecentDecks,
  TrendingDecks,
  CategoryPicker,
  Feed,
} from 'components/explore';

const ExplorePage = () => {
  const { data, status, error } = useFeedQuery(client);
  console.log('ASDFASDF ', process.env.NEXT_PUBLIC_GRAPHQL_API);
  return (
    <>
      <Head>
        <title>Flash</title>
      </Head>

      <main className='pt-6 lg:col-span-9 xl:col-span-6'>
        <CategoryPicker />
        <Feed data={data} error={error} status={status} />
      </main>

      <aside className='hidden xl:block xl:col-span-4'>
        <div className='sticky pt-6 scroll-container pb-24 overflow-y-auto space-y-4 top-[4.5rem]'>
          <RecentDecks data={data} error={error} status={status} />
          <TrendingDecks data={data} error={error} status={status} />
        </div>
      </aside>
    </>
  );
};

export default ExplorePage;
