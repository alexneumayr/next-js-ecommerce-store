'use server';
import { cookies } from 'next/headers';

export async function getCookie(name) {
  const cookie = (await cookies()).get(name);
  if (!cookie) {
    return undefined;
  } else {
    return cookie.value;
  }
}

export async function createOrUpdateCookie(productId, amount) {
  const cartCookie = (await cookies()).get('cart');
  const cart = !cartCookie ? [] : JSON.parse(cartCookie.value);
  const productToUpdate = cart.find((productInCart) => {
    return productInCart.id === productId;
  });
  if (!productToUpdate) {
    cart.push({ id: productId, amount: amount });
    console.log('Hi');
  } else {
    productToUpdate.amount = amount;
  }
  (await cookies()).set('cart', JSON.stringify(cart));
}
