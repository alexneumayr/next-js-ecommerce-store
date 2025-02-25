'use server';
import { cookies } from 'next/headers';
import { addOrUpdateCart } from './addOrUpdateCart';
import { parseJson } from './json';

// Returns the value of the cookie with the name provided in the parameter
export async function getCookie(name) {
  const cookie = (await cookies()).get(name);
  if (!cookie) {
    return undefined;
  } else {
    return cookie.value;
  }
}

/* Creates a cookie with the name "cart" that contains an array with an object
that consists of {id: <productId>, amount: <amount>}. If the cookie
already existed before, this object will then be attached to
the previous content of the array. */
export async function createOrUpdateCartCookie(productId, amount) {
  const cartCookie = await getCookie('cart');
  const cartFromCookie = !cartCookie ? [] : parseJson(cartCookie);
  const updatedCart = addOrUpdateCart(cartFromCookie, productId, amount);
  (await cookies()).set('cart', JSON.stringify(updatedCart), {
    maxAge: 31556952000,
  });
}

/* Deletes the cookie with the name provided in the parameter by setting
a new cookie with that name which expires immediately */
export async function removeCookie(name) {
  (await cookies()).set(name, JSON.stringify([]), {
    maxAge: 0,
  });
}
