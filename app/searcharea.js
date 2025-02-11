'use client';
import { usePathname, useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

export default function SearchArea() {
  const pathname = usePathname();
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (pathname !== '/search') {
      console.log('Path', pathname);
      setSearchText('');
    }
  }, [pathname]);

  function handleFormSubmit(event) {
    event.preventDefault();
    const params = new URLSearchParams();
    params.set('text', searchText);
    router.push(`/search?${params}`);
  }
  return (
    <form onSubmit={handleFormSubmit}>
      <input
        value={searchText}
        onChange={(event) => setSearchText(event.currentTarget.value)}
      />
      <button>Search</button>
    </form>
  );
}
