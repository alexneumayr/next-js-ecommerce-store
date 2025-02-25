import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import SignUpForm from './SignUpForm';

export const metadata = {
  title: 'Sign Up',
  description:
    'Create an account to access exclusive tech deals, track orders, and enjoy a personalized shopping experience.',
};

export default async function RegisterPage() {
  // Redirects to the home page if a session already exists
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }
  return (
    <div className="max-w-[550px] my-20 mx-auto px-10">
      <h1 className="text-[27px] font-semibold mb-4">Create an account</h1>
      {/* Loads the main component of the page. */}
      <SignUpForm />
    </div>
  );
}
