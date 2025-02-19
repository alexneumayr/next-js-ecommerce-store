import { compare } from 'bcrypt';
import {
  type DefaultSession,
  type DefaultUser,
  type NextAuthOptions,
} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserInsecure } from '../database/user';

/* type User = { id: number; username: string; role: string };
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: DefaultSession['user'] & {
      role: string;
    };
  }
  interface User extends DefaultUser {
    role: string;
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
        console.log('Credentials', credentials);
        if (!credentials) return null;
        if (credentials.username) {
          const response = await getUserInsecure(credentials.username);
          console.log('Login Response', response);
          const user = response[0];
          if (user) {
            const passwordCorrect = await compare(
              credentials.password || '',
              user.password,
            );
            console.log('Password Correct', passwordCorrect);
            if (passwordCorrect) {
              console.log(
                'Login Successful!',
                user.id,
                user.username,
                user.role,
              );
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
      if (typeof user !== 'undefined') token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role as string;
      return session;
    },
  },
};
