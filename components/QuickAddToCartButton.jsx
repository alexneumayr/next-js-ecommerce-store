'use client';
import { createOrUpdateCookie, getCookie } from '../util/cookies';
import { parseJson } from '../util/json';
import CartIconButton from './CartIconButton';

export default function QuickAddToCartButton({ id }) {
  return (
    <button
      className="flex p-2 justify-center gap-2 items-center text-[13px] font-semibold rounded-[5px] bg-primary w-[130px] text-white cursor-pointer hover:bg-[#00b755d6]"
      onClick={async () => {
        const cartCookie = await getCookie('cart');
        const basicCart = parseJson(cartCookie) || [];
        const currentProduct = basicCart.find((cartItem) => cartItem.id === 1);
        if (currentProduct) {
          await createOrUpdateCookie(id, currentProduct.amount + 1);
        } else {
          await createOrUpdateCookie(id, 1);
        }
      }}
    >
      <CartIconButton /> Add to Cart
    </button>
  );
}
