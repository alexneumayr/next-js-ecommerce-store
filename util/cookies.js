'use server';
import { cookies } from 'next/headers';
import { addOrUpdateCart } from './addOrUpdateCart';
import { parseJson } from './json';

export async function getCookie(name) {
  const cookie = (await cookies()).get(name);
  if (!cookie) {
    return undefined;
  } else {
    return cookie.value;
  }
}

export async function createOrUpdateCookie(productId, amount) {
  const cartCookie = await getCookie('cart');
  const cartFromCookie = !cartCookie ? [] : parseJson(cartCookie);
  const updatedCart = addOrUpdateCart(cartFromCookie, productId, amount);
  (await cookies()).set('cart', JSON.stringify(updatedCart), {
    maxAge: 31556952000,
  });
}

export async function removeCookie() {
  (await cookies()).set('cart', JSON.stringify([]), {
    maxAge: 0,
  });
}
