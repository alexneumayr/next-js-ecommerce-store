'use client';

import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function LogoutMain() {
  useEffect(() => {
    setTimeout(() => {
      signOut({ callbackUrl: '/' })
        .then(() => console.log('Sign Out Successful'))
        .catch(() => console.log('Sign out failed'));
    }, 500);
  }, []);

  return (
    <div className="h-[65vh] flex  flex-col justify-center">
      <h1 className="text-6xl font-extrabold text-center mb-10">Logging out</h1>
      <p className=" text-black text-[25px] font-normal text-center">
        You will be redirected to the main page shortly...
      </p>
    </div>
  );
}
