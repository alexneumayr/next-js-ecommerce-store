'use client';

import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function LogoutMain() {
  useEffect(() => {
    setTimeout(() => {
      signOut({ callbackUrl: '/' })
        .then(() => console.log('Sign Out Successful'))
        .catch((e) => console.log('Sign out failed'));
    }, 500);
  }, []);

  return (
    <>
      <h1>Logging out</h1>
      <p>You will be redirected to the main page shortly...</p>
    </>
  );
}
