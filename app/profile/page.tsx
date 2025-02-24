import { getServerSession } from 'next-auth';
import { authOptions } from '../../util/authOptions';
import LogoutButton from './LogoutButton';

export const metadata = {
  title: 'User Profile',
  description:
    'Manage your account details, view order history, and update preferences on your personal profile page.',
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-10 my-10">
      <h1 className="text-black text-6xl font-extrabold text-center">
        Welcome back, {session?.user.username}
      </h1>
      <img
        className="w-[500px] mx-auto"
        src="welcome-back.jpg"
        alt="Welcome back"
      />
      <LogoutButton className="mx-auto" />
    </div>
  );
}
