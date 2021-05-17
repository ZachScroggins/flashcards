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
      scope: '',
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
  jwt: {
    secret: process.env.NEXT_AUTH_JWT_SECRET,
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },

  // Callbacks
  callbacks: {
    jwt: async (token, user, account, profile, isNewUser) => {
      const isSignIn = user ? true : false;

      // add user id to token on sign in
      if (isSignIn) token.id = user?.id ?? null;

      return token;
    },
    session: async (session, token) => {
      session.user.id = token?.id ?? null;
      return session;
    },
  },
});
