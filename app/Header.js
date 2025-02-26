import { getServerSession } from 'next-auth';
import Link from 'next/link';
import CartIcon from '../components/CartIcon';
import ProfileIcon from '../components/ProfileIcon';
import { authOptions } from '../util/authOptions';
import { getCookie } from '../util/cookies';
import { parseJson } from '../util/json';
import SearchArea from './SearchArea';

export default async function Header() {
  // Gets cart cookie content
  const cartCookie = await getCookie('cart');
  // Returns the parsed cookie or an empty array if cookie doesn't exist
  const cart = parseJson(cartCookie) || [];
  // Sums the quantities of all products in the cookie
  const cartSize = cart.reduce(
    (prevValue, currentValue) =>
      Number(prevValue) + Number(currentValue.amount),
    0,
  );
  // Gets the session
  const session = await getServerSession(authOptions);

  return (
    <header>
      {/* Show a green line at the top */}
      <div className="bg-primary h-3 " />
      <div className="px-5 flex gap-2 h-[110px] items-center  bg-white dark:bg-[#1C1C1C] shadow-[0px_4px_4px_0px_rgba(166,166,166,0.25)] w-full">
        <Link href="/" className="">
          {/* Shows the logo in light mode */}
          <img
            className="w-[200px] dark:hidden"
            src="logo-main.png"
            alt="Site logo"
          />
          {/* Shows the logo in dark mode */}
          <img
            className="w-[200px] hidden dark:block"
            src="logo-white.png"
            alt="Site logo"
          />
        </Link>
        {/* Displays the search area */}
        <SearchArea />
        {/* Shows the navigation menu with the links */}
        <nav className="flex-auto">
          <ul className="flex gap-2">
            <li className="w-full flex justify-around gap-2">
              {/* Shows a link to the admin area if the user's role is "admin" */}
              {session?.user.role === 'admin' && (
                <Link
                  className="hover:text-primary text-[21px] font-bold"
                  href="/admin"
                >
                  Admin
                </Link>
              )}
              <Link
                className="hover:text-primary text-[21px] font-bold"
                href="/products"
                data-test-id="products-link"
              >
                Products
              </Link>
            </li>
            <li className="flex flex-none">
              {session && (
                <Link className="" href="/profile">
                  <ProfileIcon className="stroke-black dark:stroke-white hover:stroke-primary" />
                </Link>
              )}
              {!session && (
                <Link href="/login">
                  <ProfileIcon className="stroke-black dark:stroke-white hover:stroke-primary" />
                </Link>
              )}
            </li>
            <li className="flex-none group">
              {/* Shows the cart icon with the amount of items in the cookie */}
              <Link className="flex " href="/cart" data-test-id="cart-link">
                <CartIcon className="stroke-black dark:stroke-white group-hover:stroke-primary" />

                <span
                  className="relative bottom-[10px] text-[17px] font-medium group-hover:text-primary"
                  data-test-id="cart-count"
                >
                  {cartSize}
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
