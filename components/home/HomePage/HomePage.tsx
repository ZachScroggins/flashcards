import Head from 'next/head';
import { Footer } from 'components/common';
import { useQuery } from 'react-query';
import { request, gql } from 'graphql-request';
import { useFeedQuery } from 'lib/generated';
import client from 'lib/gql-request-client';
import Link from 'next/link';

const endpoint = 'http://localhost:3000/api/graphql';

const HomePage = () => {
  // const { data } = useQuery('feed', async () => {
  //   const { feed } = await request(
  //     endpoint,
  //     gql`
  //       query {
  //         feed {
  //           id
  //           title
  //           content
  //           published
  //           author {
  //             id
  //             name
  //             email
  //           }
  //         }
  //       }
  //     `
  //   );
  //   return feed;
  // });

  const { data } = useFeedQuery(client);

  console.log(data);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <Head>
        <title>Flashcards</title>
      </Head>

      <main className='flex flex-col items-center justify-center flex-1 px-20 text-center'>
        <h1 className='text-6xl font-bold'>
          Welcome to{' '}
          <a className='text-blue-600' href='https://nextjs.org'>
            Next.js!
          </a>
        </h1>

        <p className='mt-3 text-2xl'>
          Get started by editing{' '}
          <code className='p-3 font-mono text-lg bg-gray-100 rounded-md'>
            pages/index.js
          </code>
        </p>

        <p className='mt-3 text-2xl'>
          <Link href='/test'>
            <a>Test Page</a>
          </Link>
        </p>

        <div className='flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full'>
          <a
            href='https://nextjs.org/docs'
            className='p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600'
          >
            <h3 className='text-2xl font-bold'>Documentation &rarr;</h3>
            <p className='mt-4 text-xl'>
              Find in-depth information about Next.js features and API.
            </p>
          </a>

          <a
            href='https://nextjs.org/learn'
            className='p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600'
          >
            <h3 className='text-2xl font-bold'>Learn &rarr;</h3>
            <p className='mt-4 text-xl'>
              Learn about Next.js in an interactive course with quizzes!
            </p>
          </a>

          <a
            href='https://github.com/vercel/next.js/tree/master/examples'
            className='p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600'
          >
            <h3 className='text-2xl font-bold'>Examples &rarr;</h3>
            <p className='mt-4 text-xl'>
              Discover and deploy boilerplate example Next.js projects.
            </p>
          </a>

          <a
            href='https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
            className='p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600'
          >
            <h3 className='text-2xl font-bold'>Deploy &rarr;</h3>
            <p className='mt-4 text-xl'>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
