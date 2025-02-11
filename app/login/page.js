import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import LoginForm from './LoginForm';

export default async function LoginPage() {
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }
  return <LoginForm />;
}
