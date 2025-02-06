'use client';
import { useState } from 'react';
import { getProducts } from '../database/products';
import { createOrUpdateCookie, getCookie } from '../util/cookies';
import { parseJson } from '../util/json';
import RemoveButton from './RemoveButton';

/* export const metadata = {
  title: 'Cart',
  description:
    'Review your cart and proceed to checkout securely. Enjoy fast shipping and great deals on the latest tech gadgets, electronics, and accessories. Shop with confidence!',
}; */

let total = 0;

async function processCookieOld() {
  const cartCookie = await getCookie('cart');
  console.log('cartCookie', cartCookie);
  const cart = parseJson(cartCookie) || [];
  const allProducts = getProducts();
  console.log('cart', cart);
  console.log('allProducts', allProducts);
  return allProducts.map((product) => {
    const correlatingCartProduct = cart.find((item) => item.id === product.id);
    console.log(correlatingCartProduct);
    if (correlatingCartProduct !== undefined) {
      const subtotal = product.price * correlatingCartProduct.amount;
      total = total + subtotal;
      return { id: product.id, name: product.name, price: product.price };
    } else {
      return null;
    }
  });
}

async function processCookie() {
  const cartCookie = await getCookie('cart');
  console.log('cartCookie', cartCookie);
  const cart = parseJson(cartCookie) || [];
  const allProducts = getProducts();
  console.log('cart', cart);
  console.log('allProducts', allProducts);
  return allProducts
    .map((product) => {
      const correlatingCartProduct = cart.find(
        (item) => item.id === product.id,
      );
      console.log(correlatingCartProduct);
      if (correlatingCartProduct !== undefined) {
        console.log(correlatingCartProduct);
        const subtotal = product.price * correlatingCartProduct.amount;
        total = total + subtotal;
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          subtotal: correlatingCartProduct.id,
        };
      }
    })
    .filter((product) => product);
}

export default async function CartPage() {
  const a = await processCookie();
  console.log('a', a);
  return (
    <>
      <div>
        <h1>Cart</h1>
        {a.map((product) => {
          return (
            <div>
              id: {product.id}
              <br />
              name: {product.name}
              <br />
              price: {product.price}
              <br />
              subtotal: {product.subtotal}
              {/*          <button onClick={() => createOrUpdateCookie(product.id, '0')}>
                Remove
              </button> */}
              <RemoveButton />
              <br />
              <br />
            </div>
          );
        })}
        Total: {total}
      </div>
    </>
  );
}
