import { GraphQLClient } from 'graphql-request';

// const endpoint = 'http://localhost:3000/api/graphql';
const endpoint = `${process.env.NEXT_PUBLIC_GRAPHQL_API}`;

// create a GraphQL client instance to send requests
const client = new GraphQLClient(endpoint, { headers: {} });

export default client;
