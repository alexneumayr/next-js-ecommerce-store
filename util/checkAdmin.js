import { getServerSession } from 'next-auth';
import { authOptions } from './authOptions';

export async function checkAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user.role === 'admin';
}
