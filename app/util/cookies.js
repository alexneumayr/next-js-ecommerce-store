'use server';
import { cookies } from 'next/headers';
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
  console.log('current amount', amount);
  const cartCookie = await getCookie('cart');
  let cart = !cartCookie ? [] : parseJson(cartCookie);
  const productToUpdate = cart.find((productInCart) => {
    return productInCart.id === productId;
  });
  if (!productToUpdate && amount !== 0) {
    cart.push({ id: productId, amount: amount });
  } else {
    if (amount === 0) {
      cart = cart.filter((product) => product.id !== productToUpdate.id);
    } else {
      productToUpdate.amount = amount;
    }
  }
  (await cookies()).set('cart', JSON.stringify(cart), { maxAge: 31556952000 });
}

export async function removeCookie() {
  (await cookies()).set('cart', JSON.stringify([]), {
    maxAge: 0,
  });
}
