import { compare } from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sql } from '../../../database/connect';

const handler = NextAuth({
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
          const response = await sql`
            SELECT
              *
            FROM
              users
            WHERE
              username = ${credentials?.username}
          `;

          console.log('Login Response', response);
          const user = response[0];
          const passwordCorrect = await compare(
            credentials?.password || '',
            user?.password,
          );
          console.log('Password Correct', passwordCorrect);
          if (passwordCorrect) {
            console.log('Login Successful!');
            return {
              id: user?.id,
              username: user?.username,
            };
          }
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
