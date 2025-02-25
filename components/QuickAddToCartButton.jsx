'use client';
import { createOrUpdateCookie, getCookie } from '../util/cookies';
import { parseJson } from '../util/json';
import CartButtonIcon from './CartButtonIcon';

export default function QuickAddToCartButton({ id }) {
  return (
    /* Returns a button that either adds the product to the cart cookie with "amount" set to 1
    if it is not yet in the cookie. If it is already in the cookie it increments it's amount
    by 1. */
    <button
      className="flex p-2 justify-center gap-2 items-center text-[13px] font-semibold rounded-[5px] bg-primary w-[130px] text-white cursor-pointer hover:bg-[#00b755d6]"
      onClick={async () => {
        const cartCookie = await getCookie('cart');
        const basicCart = parseJson(cartCookie) || [];
        const currentProduct = basicCart.find((cartItem) => cartItem.id === id);
        if (currentProduct) {
          await createOrUpdateCookie(id, currentProduct.amount + 1);
        } else {
          await createOrUpdateCookie(id, 1);
        }
      }}
    >
      <CartButtonIcon /> Add to Cart
    </button>
  );
}
