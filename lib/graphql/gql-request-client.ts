import { GraphQLClient } from 'graphql-request';

// const endpoint = 'http://localhost:3000/api/graphql';
let endpoint;

if (process.env.NODE_ENV === 'development') {
  endpoint = 'http://localhost:3000/api/graphql';
}
if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
  endpoint = 'https://flash-web.vercel.app/api/graphql';
}
if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
  // endpoint = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/graphql`;
  endpoint = `https://flash-web-test-prisma.vercel.app/api/graphql`;
}

console.log(endpoint);

// create a GraphQL client instance to send requests
const client = new GraphQLClient(endpoint, { headers: {} });

export default client;
