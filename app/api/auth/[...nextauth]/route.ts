import NextAuth from 'next-auth';
import { authOptions } from '../../../../util/authOptions';

/* Creates the authentication handler */
const handler = NextAuth(authOptions);

/* Exports the authentication handler for GET and POST requests */
export { handler as GET, handler as POST };
