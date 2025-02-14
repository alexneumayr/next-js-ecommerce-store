import { compare } from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sql } from '../../../database/connect';

type User = {
  id: number;
  password: string;
  username: string;
  role: string;
};

export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        console.log('Credentials', credentials);
        if (credentials?.username) {
          const response = await sql<User[]>`
            SELECT
              *
            FROM
              users
            WHERE
              username = ${credentials.username}
          `;

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
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
