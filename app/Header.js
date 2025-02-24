import { getServerSession } from 'next-auth';
import Link from 'next/link';
import CartIcon from '../components/CartIcon';
import ProfileIcon from '../components/ProfileIcon';
import { authOptions } from '../util/authOptions';
import { getCookie } from '../util/cookies';
import { parseJson } from '../util/json';
import SearchArea from './SearchArea';

export default async function Header() {
  const cartCookie = await getCookie('cart');
  const cart = parseJson(cartCookie) || [];
  const cartSize = cart.reduce(
    (prevValue, currentValue) => +prevValue + +currentValue.amount,
    0,
  );
  const session = await getServerSession(authOptions);

  return (
    <header>
      <div className="bg-primary h-3 " />
      <div className="px-5 flex gap-2 h-[110px] items-center  bg-white shadow-[0px_4px_4px_0px_rgba(166,166,166,0.25)] w-full">
        <Link href="/" className="">
          <img className="w-[200px]" src="logo-main.png" alt="Site logo" />
        </Link>
        <SearchArea />
        <nav className="flex-auto">
          <ul className="flex gap-2">
            <li className="w-full flex justify-around gap-2">
              {session?.user.role === 'admin' && (
                <Link
                  className="text-black hover:text-primary text-[21px] font-bold"
                  href="/admin"
                >
                  Admin
                </Link>
              )}
              <Link
                className="text-black hover:text-primary text-[21px] font-bold"
                href="/products"
                data-test-id="products-link"
              >
                Products
              </Link>
            </li>
            <li className="flex flex-none">
              {session && (
                <Link className="" href="/profile">
                  <ProfileIcon className="stroke-black hover:stroke-primary" />
                </Link>
              )}
              {!session && (
                <Link href="/login">
                  <ProfileIcon className="stroke-black hover:stroke-primary" />
                </Link>
              )}
            </li>
            <li className="flex-none group">
              <Link className="flex " href="/cart" data-test-id="cart-link">
                <CartIcon className="stroke-black group-hover:stroke-primary" />

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
