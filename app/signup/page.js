import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import SignUpForm from './signupform';

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
  return (
    <>
      <h1>Create an account</h1>
      <SignUpForm />
    </>
  );
}
