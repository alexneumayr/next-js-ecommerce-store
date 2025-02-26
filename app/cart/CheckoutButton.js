'use client';
import { useRouter } from 'next/navigation';

export default function CheckoutButton({ className, ...rest }) {
  const router = useRouter();
  /* Returns the "Proceed to Checkout" button which redirects to "/checkout" when it is clicked. */
  return (
    <button
      {...rest}
      data-test-id="cart-checkout"
      className={
        className +
        'flex p-2 justify-center gap-2 items-center text-[19px] font-semibold rounded-[5px] w-[305px]  bg-primary  text-white cursor-pointer hover:bg-[#00b755d6] '
      }
      onClick={() => router.push('/checkout')}
    >
      Proceed to Checkout
    </button>
  );
}
