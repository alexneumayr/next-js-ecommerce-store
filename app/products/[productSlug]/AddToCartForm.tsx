'use client';
import { useState } from 'react';
import { createOrUpdateCookie } from '../../util/cookies';

type Props = {
  id: number;
};

export default function AddToCartForm(props: Props) {
  const [amount, setAmount] = useState(1);
  async function handleAddToCartButtonClick() {
    await createOrUpdateCookie(props.id, Number(amount));
  }
  return (
    <form>
      <label htmlFor="inputamount">Amount:</label>
      <input
        type="number"
        id="inputamount"
        min="1"
        value={amount}
        onChange={(event) => setAmount(Number(event.currentTarget.value))}
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
