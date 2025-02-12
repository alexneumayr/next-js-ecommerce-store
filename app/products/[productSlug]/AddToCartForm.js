'use client';
import { useState } from 'react';
import { createOrUpdateCookie } from '../../util/cookies';

export default function AddToCartForm(props) {
  const [amount, setAmount] = useState(1);
  return (
    <form>
      <label htmlFor="inputamount">Amount:</label>
      <input
        type="number"
        id="inputamount"
        min="0"
        value={amount}
        onChange={(event) => setAmount(event.currentTarget.value)}
        data-test-id="product-quantity"
      />
      <br />
      <button
        formAction={() => createOrUpdateCookie(props.id, amount)}
        data-test-id="product-add-to-cart"
      >
        Add to cart
      </button>
    </form>
  );
}
