import { signOut } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

export const metadata = {
  title: 'Logout',
  description:
    'You have successfully logged out. Visit us again for the latest products and exclusive deals.',
};

export default function LogoutPage() {
  const router = useRouter();
  signOut()
    .then(() => {
      router.refresh();
      redirect('/');
    })
    .catch((e) => console.log(e));
  return <div>Logged out</div>;
}
