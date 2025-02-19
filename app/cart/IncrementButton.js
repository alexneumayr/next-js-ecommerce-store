'use client';
import { createOrUpdateCookie } from '../../util/cookies';

export default function IncrementButton(props) {
  return (
    <button
      onClick={() =>
        createOrUpdateCookie(props.id, Number(props.currentAmount + 1))
      }
      data-test-id={`cart-product-quantity-increment-${props.slug}`}
    >
      +1
    </button>
  );
}
