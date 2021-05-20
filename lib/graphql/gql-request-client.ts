import { GraphQLClient } from 'graphql-request';

let endpoint: string;

if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
  endpoint = 'https://flash-web.vercel.app/api/graphql';
}
if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
  endpoint = `https://flash-web-dev.vercel.app/api/graphql`;
}
if (process.env.NODE_ENV === 'development') {
  endpoint = 'http://localhost:3000/api/graphql';
}

// create a GraphQL client instance to send requests
const client = new GraphQLClient(endpoint, { headers: {} });

export default client;
