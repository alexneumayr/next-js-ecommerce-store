import '@fortawesome/fontawesome-svg-core/styles.css';
import { faCartFlatbedSuitcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { getCookie } from './util/cookies';

export default async function Header() {
  const cartCookie = await getCookie('cart');
  const cart = JSON.parse(cartCookie) || [];
  const cartSize = cart.reduce(
    (prevValue, currentValue) => +prevValue + +currentValue.amount,
    0,
  );
  return (
    <header>
      <Link href="/">
        <img src="/logo.png" width="200px" alt="Site logo" />
      </Link>

      <nav>
        <ul>
          <li>
            <Link href="/products">Products</Link>
          </li>
          <li>
            <Link href="/cart">
              <FontAwesomeIcon
                icon={faCartFlatbedSuitcase}
                size="2x"
                className="cart-icon"
              />
              {cartSize}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
