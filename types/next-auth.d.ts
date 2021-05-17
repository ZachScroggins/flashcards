import NextAuth from 'next-auth';
import { Session, User } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    user: User;
  }

  interface User {
    /** User id from database */
    id?: number | null;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** User id from database */
    id?: number;
  }
}
