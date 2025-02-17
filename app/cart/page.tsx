import Link from 'next/link';
import { getProductsInsecure } from '../../database/products';
import { getCookie } from '../../util/cookies';
import { parseJson } from '../../util/json';
import CheckoutButton from './CheckoutButton';
import DecrementButton from './DecrementButton';
import IncrementButton from './IncrementButton';
import RemoveButton from './RemoveButton';

export const metadata = {
  title: 'Cart',
  description:
    'Review your cart and proceed to checkout securely. Enjoy fast shipping and great deals on the latest tech gadgets, electronics, and accessories. Shop with confidence!',
};

type Cart = {
  id: number;
  amount: number;
};

export default async function CartPage() {
  const cartCookie = await getCookie('cart');
  const cart: Cart[] = parseJson(cartCookie) || [];
  const allProducts = await getProductsInsecure();
  const cartProducts = allProducts
    .map((product) => {
      const correlatingCartProduct = cart.find(
        (item) => item.id === product.id,
      );
      if (correlatingCartProduct !== undefined) {
        return {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          image: product.image,
          amount: correlatingCartProduct.amount,
          subtotal: product.price * correlatingCartProduct.amount,
        };
      } else {
        return null;
      }
    })
    .filter((product) => product !== null);
  const total = cartProducts.reduce(
    (prevValue, currentValue) => prevValue + currentValue.subtotal,
    0,
  );
  return (
    <div>
      <h1>Cart</h1>
      {cartProducts.map((product) => {
        return (
          <div
            data-test-id={`cart-product-${product.slug}`}
            key={`product-${product.slug}`}
          >
            {product.image && (
              <div className="product-image-container-cart">
                <img
                  data-test-id="product-image"
                  src={product.image}
                  alt={product.name}
                  className="product-image-cart"
                />
              </div>
            )}
            <br />
            Name:
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
            <br />
            Price: {(product.price / 100).toFixed(2)}
            <br />
            Amount:
            <span data-test-id={`cart-product-quantity-${product.slug}`}>
              {product.amount}
            </span>
            <br />
            Subtotal: {(product.subtotal / 100).toFixed(2)}
            <br />
            <IncrementButton id={product.id} currentAmount={product.amount} />
            <DecrementButton id={product.id} currentAmount={product.amount} />
            <br />
            <RemoveButton id={product.id} slug={product.slug} />
            <br />
            <br />
          </div>
        );
      })}
      Total: <span data-test-id="cart-total">{(total / 100).toFixed(2)}</span>
      <br />
      <CheckoutButton />
      <br />
      <br />
    </div>
  );
}
