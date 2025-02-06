import '@fortawesome/fontawesome-svg-core/styles.css';
import { faCartFlatbedSuitcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { getCookie } from './util/cookies';
import { parseJson } from './util/json';

export default async function Header() {
  const cartCookie = await getCookie('cart');
  const cart = parseJson(cartCookie) || [];
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
            <Link href="/products" data-test-id="products-link">
              Products
            </Link>
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
