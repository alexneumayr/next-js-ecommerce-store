import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return <h1>{session ? 'Welcome back' : 'Welcome'}</h1>;
}
