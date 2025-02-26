'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SearchIcon from '../components/SearchIcon';

export default function SearchArea() {
  const pathname = usePathname(); // Stores the current path
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  /* The following is needed so that the search text stays in the input field when
  the user goes to the Search Results but then gets cleared when the user visits
  another page. Otherwise the search text would stay in the input field until
  it gets manually deleted by the user. */
  useEffect(() => {
    /* Whenever the path changes it checks if the current path is different to "/search"
    and clears the search field if that's the case */
    if (pathname !== '/search') {
      setSearchText('');
    }
  }, [pathname]);

  /* Form submit handler that redirects to the "/search" page and passes the inputted
  search text as the URL parameter "text" when the search button is clicked. */
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
          className="border w-full max-w-[500px] border-r-0 h-[39px] p-2 rounded-l-[39px] focus:outline-none"
          value={searchText}
          onChange={(event) => setSearchText(event.currentTarget.value)}
          placeholder="What are you looking for?"
        />
        <button className="border border-l-0 rounded-r-[39px] p-2.5">
          <SearchIcon className="w-4 h-4 stroke-black dark:stroke-white hover:stroke-primary hover:cursor-pointer" />
        </button>
      </div>
    </form>
  );
}
