'use client';
import { signOut } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

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
