'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SearchIcon from '../components/SearchIcon';

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
    <form onSubmit={handleFormSubmit} className="flex-auto mx-5">
      <div className="flex">
        <input
          className="border w-full max-w-[500px] border-black border-r-0 h-[39px] p-2 rounded-l-[39px] focus:outline-none"
          value={searchText}
          onChange={(event) => setSearchText(event.currentTarget.value)}
          placeholder="What are you looking for?"
        />
        <button className="border border-black border-l-0 rounded-r-[39px] p-2.5">
          <SearchIcon className="w-4 h-4 stroke-black hover:stroke-primary hover:cursor-pointer" />
        </button>
      </div>
    </form>
  );
}
