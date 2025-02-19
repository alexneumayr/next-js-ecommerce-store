'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ThankYouMain() {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return <h1>Thank you</h1>;
}
