import { GraphQLClient } from 'graphql-request';

const endpoint = 'http://localhost:3000/api/graphql';

// create a GraphQL client instance to send requests
const client = new GraphQLClient(endpoint, { headers: {} });

console.log('created client');

export default client;
