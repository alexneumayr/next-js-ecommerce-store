import Link from 'next/link';
import { useState } from 'react';
import { getProducts } from '../database/products';
import { getCookie } from '../util/cookies';
import { parseJson } from '../util/json';
import CheckoutButton from './CheckoutButton';
import DecrementButton from './DecrementButton';
import IncrementButton from './IncrementButton';
import RemoveButton from './RemoveButton';

export const metadata = {
  title: 'Cart',
  description:
    'Review your cart and proceed to checkout securely. Enjoy fast shipping and great deals on the latest tech gadgets, electronics, and accessories. Shop with confidence!',
};

export default async function CartPage() {
  const cartCookie = await getCookie('cart');
  const cart = parseJson(cartCookie) || [];
  const allProducts = await getProducts();
  let total = 0;
  return (
    <div>
      <h1>Cart</h1>
      {allProducts.map((product) => {
        const correlatingCartProduct = cart.find(
          (item) => item.id === product.id,
        );
        if (
          correlatingCartProduct !== undefined &&
          correlatingCartProduct.amount > 0
        ) {
          const subtotal = product.price * correlatingCartProduct.amount;
          total = total + subtotal;
          return (
            <div
              data-test-id={`cart-product-${product.slug}`}
              key={`product-${product.slug}`}
            >
              Id: {product.id}
              <br />
              Name:
              <Link href={`/products/${product.slug}`}>{product.name}</Link>
              <br />
              Price: {(product.price / 100).toFixed(2)}
              <br />
              Amount:
              <span data-test-id={`cart-product-quantity-${product.slug}`}>
                {correlatingCartProduct.amount}
              </span>
              <br />
              Subtotal: {(subtotal / 100).toFixed(2)}
              <br />
              <IncrementButton
                id={product.id}
                currentAmount={correlatingCartProduct.amount}
              />
              <DecrementButton
                id={product.id}
                currentAmount={correlatingCartProduct.amount}
              />
              <br />
              <RemoveButton id={product.id} slug={product.slug} />
              <br />
              <br />
            </div>
          );
        } else {
          return null;
        }
      })}
      Total: <span data-test-id="cart-total">{(total / 100).toFixed(2)}</span>
      <br />
      <CheckoutButton />
    </div>
  );
}
