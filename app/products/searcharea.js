'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchArea() {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();
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
