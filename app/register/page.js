import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import RegisterForm from './RegisterForm';

export const metadata = {
  title: 'Sign Up',
  description:
    'Create an account to access exclusive tech deals, track orders, and enjoy a personalized shopping experience.',
};

export default async function RegisterPage() {
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }
  return <RegisterForm />;
}
