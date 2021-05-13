import Head from 'next/head';
import Link from 'next/link';
import { useQueryClient } from 'react-query';
import client from 'lib/graphql/gql-request-client';
import {
  useCreateDraftMutationMutation,
  useDeletePostMutation,
  useFeedQuery,
} from 'lib/generated';

const Test = () => {
  const { data, status, error } = useFeedQuery(client);

  const queryClient = useQueryClient();

  const { mutate } = useDeletePostMutation(client, {
    onSuccess: () => queryClient.invalidateQueries('Feed'),
  });

  const { mutate: create } = useCreateDraftMutationMutation(client, {
    onSuccess: () => queryClient.invalidateQueries('Feed'),
  });

  console.log(data);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <Head>
        <title>Flash</title>
      </Head>

      <main className='flex flex-col items-center justify-center flex-1 px-20 text-center'>
        <h1 className='text-6xl font-bold'>Test</h1>

        <Link href='/'>
          <a className='text-2xl text-blue-700 hover:underline'>Home</a>
        </Link>

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
              <div className='mt-4'>
                <button
                  className='px-4 py-2 text-white bg-blue-600 rounded'
                  onClick={() =>
                    data.feed &&
                    create({
                      authorEmail: 'bob@bob.com',
                      title: 'New Post',
                      content: 'This post was generated by the button',
                    })
                  }
                >
                  Create Post
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Test;
