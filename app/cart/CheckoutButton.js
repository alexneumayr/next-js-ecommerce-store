'use client';
import { useRouter } from 'next/navigation';

export default function CheckoutButton({ className }) {
  const router = useRouter();
  return (
    <button
      data-test-id="cart-checkout"
      className={
        className +
        'flex p-2 justify-center gap-2 items-center text-[19px] font-semibold rounded-[5px] w-[305px]  bg-primary  text-white cursor-pointer hover:bg-[#00b755d6]'
      }
      onClick={() => router.push('/checkout')}
    >
      Proceed to Checkout
    </button>
  );
}
