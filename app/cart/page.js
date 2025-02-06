import { getProducts } from '../database/products';
import { createOrUpdateCookie, getCookie } from '../util/cookies';
import { parseJson } from '../util/json';
import CheckoutButton from './CheckoutButton';
import RemoveButton from './RemoveButton';

export const metadata = {
  title: 'Cart',
  description:
    'Review your cart and proceed to checkout securely. Enjoy fast shipping and great deals on the latest tech gadgets, electronics, and accessories. Shop with confidence!',
};

export default async function CartPage() {
  const cartCookie = await getCookie('cart');
  const cart = parseJson(cartCookie) || [];
  const allProducts = getProducts();
  let total = 0;
  return (
    <>
      <div>
        <h1>Cart</h1>
        {allProducts.map((product) => {
          const correlatingCartProduct = cart.find(
            (item) => item.id === product.id,
          );
          if (
            correlatingCartProduct !== undefined &&
            correlatingCartProduct.amount >= 0
          ) {
            const subtotal = product.price * correlatingCartProduct.amount;
            total = total + subtotal;
            return (
              <div>
                Id: {product.id}
                <br />
                Name: {product.name}
                <br />
                Price: {product.price}
                <br />
                Amount: {correlatingCartProduct.amount}
                <br />
                Subtotal: {subtotal}
                <br />
                <RemoveButton id={product.id} />
                <br />
                <br />
              </div>
            );
          }
        })}
        Total: {total}
        <br />
        <CheckoutButton />
      </div>
    </>
  );
}
