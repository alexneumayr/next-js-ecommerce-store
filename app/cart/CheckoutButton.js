'use client';
import { useRouter } from 'next/navigation';

export default function CheckoutButton() {
  const router = useRouter();
  return <button onClick={() => router.push('/checkout')}>Checkout</button>;
}
