import { getServerSession } from 'next-auth';
import { authOptions } from './authOptions';

/* Checks if the user is logged in and has the role "admin".
  Returns the result as a boolean value. */
export async function checkAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user.role === 'admin';
}
