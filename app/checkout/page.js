import Link from 'next/link';
import { getProducts } from '../database/products';
import { getCookie } from '../util/cookies';
import { parseJson } from '../util/json';
import CheckoutForm from './CheckoutForm';

export const metadata = {
  title: 'Checkout',
  description:
    'Secure your order with a fast and easy checkout. Enjoy great deals on the latest tech gadgets, electronics, and accessories with safe payment options and quick shipping!',
};

export default async function CheckoutPage() {
  const cartCookie = await getCookie('cart');
  const cart = parseJson(cartCookie) || [];
  const allProducts = await getProducts();
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
    <>
      <h1>Checkout</h1>
      <CheckoutForm />
      {cartProducts.map((product) => {
        return (
          <div
            data-test-id={`cart-product-${product.slug}`}
            key={`product-${product.slug}`}
          >
            <br />
            Id: {product.id}
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
          </div>
        );
      })}
      <div>
        <br />
        Total: {(total / 100).toFixed(2)}
      </div>
    </>
  );
}
