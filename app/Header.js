import '@fortawesome/fontawesome-svg-core/styles.css';
import { faCartFlatbedSuitcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
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
      <Link href="/">
        <img src="/logo.png" width="200px" alt="Site logo" />
      </Link>
      <SearchArea />
      <nav>
        <ul>
          {session?.user.role === 'admin' && (
            <li>
              <Link href="/admin">Admin</Link>
            </li>
          )}
          <li>
            <Link href="/products" data-test-id="products-link">
              Products
            </Link>
          </li>
          <li>
            {session && <Link href="/logout">Logout</Link>}
            {!session && <Link href="/login">Login</Link>}
          </li>
          <li>
            <Link href="/cart" data-test-id="cart-link">
              <FontAwesomeIcon
                icon={faCartFlatbedSuitcase}
                size="2x"
                className="cart-icon"
              />
              <span data-test-id="cart-count">{cartSize}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
