'use client';
import { useState } from 'react';
import CartIconButton from '../../../components/CartButtonIcon';
import { createOrUpdateCartCookie, getCookie } from '../../../util/cookies';
import { parseJson } from '../../../util/json';

type Props = {
  id: number;
};

type BasicCart = {
  id: number;
  amount: number;
};

export default function AddToCartForm(props: Props) {
  const [amount, setAmount] = useState<number | string>(1);

  /* Gets triggered when the "Add to cart" button is clicked. It adds the product with the inputted amount to the cart cookie if it is not in the cart yet.
  Otherwise it updates the amount stored in the cookie. */
  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Gets the content of the cart cookie
    const cartCookie = await getCookie('cart');
    /* Parses the cookie and stores it in "basicCart". If the cookie doesn't
    exist it stores an empty array instead. */
    const basicCart: BasicCart[] = parseJson(cartCookie) || [];
    /* Tries to find a product which matches the ID of the current product
    in the cart to check if the current product is already in the cart. */
    const currentProductInCart = basicCart.find(
      (cartItem) => cartItem.id === props.id,
    );
    /* If the current product is already in the cart the amount from the input field
     gets added to the amount already in the cart */
    if (currentProductInCart) {
      await createOrUpdateCartCookie(
        props.id,
        currentProductInCart.amount + Number(amount),
      );
    } else {
      /* If the cart is not in the cart yet, it gets added to it with
    the amount from the input field */
      await createOrUpdateCartCookie(props.id, amount);
    }
  }
  return (
    <form onSubmit={handleFormSubmit} className="flex gap-2 justify-start">
      {/* Shows the input field for the quantity and the "Add to cart" button */}
      <input
        id="inputamount"
        required
        data-test-id="product-quantity"
        className="w-[46px] h-[43px] border rounded-[5px] text-center"
        value={amount}
        onChange={(event) => {
          if (Number(event.currentTarget.value) > 0) {
            setAmount(Number(event.currentTarget.value));
          } else {
            setAmount('');
          }
        }}
      />
      <button
        className="flex p-2 justify-center gap-2 items-center text-[13px] font-semibold rounded-[5px] bg-primary w-[130px] text-white cursor-pointer hover:bg-[#00b755d6]"
        data-test-id="product-add-to-cart"
      >
        <CartIconButton className="" /> Add to Cart
      </button>
    </form>
  );
}
