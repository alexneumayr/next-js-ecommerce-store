import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import LoginForm from './LoginForm';

export const metadata = {
  title: 'Login',
  description:
    'Login to our online shop to access exclusive deals, track your orders, and manage your account securely.',
};

export default async function LoginPage() {
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }
  return (
    <div className="max-w-[550px] my-20 mx-auto px-10">
      <h1 className="text-[27px] font-semibold mb-4">Login</h1>
      {/* Loads the main component of the page. */}
      <LoginForm />
    </div>
  );
}
