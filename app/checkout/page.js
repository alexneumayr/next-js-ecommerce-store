import CheckoutForm from './CheckoutForm';

export const metadata = {
  title: 'Checkout',
  description:
    'Secure your order with a fast and easy checkout. Enjoy great deals on the latest tech gadgets, electronics, and accessories with safe payment options and quick shipping!',
};

export default function CheckoutPage() {
  return (
    <div>
      <h1>Checkout</h1>
      <CheckoutForm />
    </div>
  );
}
