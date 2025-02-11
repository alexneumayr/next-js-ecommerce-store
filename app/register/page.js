import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import RegisterForm from './RegisterForm';

export default async function RegisterPage() {
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }
  return <RegisterForm />;
}
