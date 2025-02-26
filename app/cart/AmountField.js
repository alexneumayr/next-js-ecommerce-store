'use client';

import { useState } from 'react';
import { createOrUpdateCartCookie } from '../../util/cookies';

export default function AmountField(props) {
  const [amount, setAmount] = useState(props.currentAmount);

  return (
    <div className="flex">
      {/* "+" button that increments the amount of the product in the cart cookie */}
      <button
        type="button"
        className="border border-[#00b755] border-r-0 rounded-l-[13px] text-2xl pl-1 hover:text-primary hover:cursor-pointer h-[45px]"
        data-test-id={`cart-product-quantity-increment-${props.slug}`}
        onClick={async () => {
          setAmount(Number(props.currentAmount + 1));
          await createOrUpdateCartCookie(
            props.id,
            Number(props.currentAmount + 1),
          );
        }}
      >
        +
      </button>
      {/* Input field that allows the user to enter a custom value for the amount. */}
      <p
        data-test-id={`cart-product-quantity-${props.slug}`}
        className="border max-w-[500px] border-r-0 border-l-0
         w-[45px] h-[45px] border-[#00b755] flex items-center justify-center"
      >
        {amount}
      </p>
      {/* "-" button that decrements the amount of the product in the cart cookie */}
      <button
        type="button"
        className="text-3xl border pr-2 border-[#00b755] border-l-0 rounded-r-[13px] hover:text-primary hover:cursor-pointer h-[45px]"
        data-test-id={`cart-product-quantity-decrement-${props.slug}`}
        onClick={async () => {
          setAmount(Number(props.currentAmount - 1));
          await createOrUpdateCartCookie(
            props.id,
            Number(props.currentAmount - 1),
          );
        }}
      >
        -
      </button>
      <input type="submit" className="hidden" />
    </div>
  );
}
