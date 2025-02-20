import { getServerSession } from 'next-auth';
import { authOptions } from '../util/authOptions';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return <h1>{session ? 'Welcome back1' : 'Welcome1'}</h1>;
}
