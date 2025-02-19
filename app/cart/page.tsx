import Link from 'next/link';
import { getProductsInsecure } from '../../database/products';
import { calculateTotal } from '../../util/calculateTotal';
import { getCookie } from '../../util/cookies';
import { extendCartProductDetails } from '../../util/extendCartProductDetails';
import { parseJson } from '../../util/json';
import CheckoutButton from './CheckoutButton';
import DecrementButton from './DecrementButton';
import IncrementButton from './IncrementButton';
import RemoveButton from './RemoveButton';

export const metadata = {
  title: 'Cart',
  description:
    'Review your cart and proceed to checkout securely. Enjoy fast shipping and great deals on the latest tech gadgets, electronics, and accessories. Shop with confidence!',
};

type BasicCart = {
  id: number;
  amount: number;
};

export default async function CartPage() {
  const cartCookie = await getCookie('cart');
  const basicCart: BasicCart[] = parseJson(cartCookie) || [];
  const allProducts = await getProductsInsecure();
  const cartProducts = extendCartProductDetails(basicCart, allProducts);

  const total = calculateTotal(cartProducts);

  return (
    <div>
      <h1>Cart</h1>
      {cartProducts.map((product) => {
        return (
          <div
            data-test-id={`cart-product-${product.slug}`}
            key={`product-${product.slug}`}
          >
            {product.image && (
              <div className="product-image-container-cart">
                <img
                  data-test-id="product-image"
                  src={product.image}
                  alt={product.name}
                  className="product-image-cart"
                />
              </div>
            )}
            <br />
            Name:
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
            <br />
            Price: {(product.price / 100).toFixed(2)}
            <br />
            Amount:
            <span data-test-id={`cart-product-quantity-${product.slug}`}>
              {product.amount}
            </span>
            <br />
            Subtotal:
            <span data-test-id={`cart-product-subtotal-${product.slug}`}>
              {(product.subtotal / 100).toFixed(2)}
            </span>
            <br />
            <IncrementButton
              id={product.id}
              slug={product.slug}
              currentAmount={product.amount}
            />
            <DecrementButton
              id={product.id}
              slug={product.slug}
              currentAmount={product.amount}
            />
            <br />
            <RemoveButton id={product.id} slug={product.slug} />
            <br />
            <br />
          </div>
        );
      })}
      Total: <span data-test-id="cart-total">{(total / 100).toFixed(2)}</span>
      <br />
      <CheckoutButton />
      <br />
      <br />
    </div>
  );
}
