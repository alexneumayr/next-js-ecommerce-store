'use client';
import { createOrUpdateCookie } from '@/app/util/cookies';
import { useState } from 'react';

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
      />
      <br />
      <button formAction={() => createOrUpdateCookie(props.id, amount)}>
        Add to cart
      </button>
    </form>
  );
}
