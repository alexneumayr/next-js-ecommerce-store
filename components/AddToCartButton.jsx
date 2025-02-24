'use client';
import { createOrUpdateCookie } from '../util/cookies';
import CartIconButton from './CartIconButton';

export default function AddToCartButton(props) {
  return (
    <button
      className="flex p-2 justify-center gap-2 items-center text-[13px] font-semibold rounded-[5px] bg-primary w-[130px] text-white cursor-pointer hover:bg-[#00b755d6]"
      onClick={async () => {
        await createOrUpdateCookie(props.id, 1);
      }}
    >
      <CartIconButton /> Add to Cart
    </button>
  );
}
