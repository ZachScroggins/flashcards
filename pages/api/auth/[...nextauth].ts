import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';
import prisma from 'lib/prisma';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
  // prisma adapter
  adapter: Adapters.Prisma.Adapter({ prisma }),

  // A random string used to hash tokens, sign cookies and generate crytographic keys.
  secret: process.env.NEXT_AUTH_SECRET,

  // use JWTs for sessions instead of database
  session: { jwt: true },

  // JWT config
  jwt: { secret: process.env.NEXT_AUTH_JWT_SECRET },
});
