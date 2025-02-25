import { compare } from 'bcrypt';
import {
  type DefaultSession,
  type DefaultUser,
  type NextAuthOptions,
} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserInsecure } from '../database/user';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: DefaultSession['user'] & {
      role: string;
      username: string;
    };
  }
  interface User extends DefaultUser {
    role: string;
    username: string;
  }
}
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'username', type: 'username' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials): Promise<any> => {
        if (!credentials) return null;
        if (credentials.username) {
          const response = await getUserInsecure(credentials.username);
          const user = response[0];
          if (user) {
            const passwordCorrect = await compare(
              credentials.password || '',
              user.password,
            );
            if (passwordCorrect) {
              return {
                id: user.id,
                username: user.username,
                role: user.role,
              };
            }
          }
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (typeof user !== 'undefined') {
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role as string;
      session.user.username = token.username as string;
      return session;
    },
  },
};
