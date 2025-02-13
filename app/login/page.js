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
    <>
      <h1>Login</h1>
      <LoginForm />
    </>
  );
}
