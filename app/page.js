import { getServerSession } from 'next-auth';
import { authOptions } from '../util/authOptions';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <h1 className="font-extrabold text-3xl">
      {session ? 'Welcome back' : 'Welcome'}
    </h1>
  );
}
