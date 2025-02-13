'use client';
import { useState } from 'react';
import { createOrUpdateCookie } from '../../util/cookies';

export default function AddToCartForm(props) {
  const [amount, setAmount] = useState(1);
  async function handleAddToCartButtonClick() {
    if (amount > 0) {
      await createOrUpdateCookie(props.id, Number(amount));
    }
  }
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
        formAction={handleAddToCartButtonClick}
        data-test-id="product-add-to-cart"
      >
        Add to cart
      </button>
    </form>
  );
}
