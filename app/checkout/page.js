import Link from 'next/link';
import { getProductsInsecure } from '../../database/products';
import { getCookie } from '../../util/cookies';
import { parseJson } from '../../util/json';
import CheckoutForm from './CheckoutForm';

export const metadata = {
  title: 'Checkout',
  description:
    'Secure your order with a fast and easy checkout. Enjoy great deals on the latest tech gadgets, electronics, and accessories with safe payment options and quick shipping!',
};

export default async function CheckoutPage() {
  const cartCookie = await getCookie('cart');
  const cart = parseJson(cartCookie) || [];
  const allProducts = await getProductsInsecure();
  const cartProducts = allProducts
    .map((product) => {
      const correlatingCartProduct = cart.find(
        (item) => item.id === product.id,
      );
      if (correlatingCartProduct !== undefined) {
        return {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          image: product.image,
          amount: correlatingCartProduct.amount,
          subtotal: product.price * correlatingCartProduct.amount,
        };
      } else {
        return null;
      }
    })
    .filter((product) => product !== null);
  const total = cartProducts.reduce(
    (prevValue, currentValue) => prevValue + currentValue.subtotal,
    0,
  );
  return (
    <div className="mx-[80px] mt-3 mb-[50px]">
      <h1 className="text-[45px] font-bold">Checkout</h1>
      <h2 className="text-[27px] font-semibold">Your Order</h2>
      <div className="rounded-[25px] border border-[#878787] min-w-[700px] my-5">
        {cartProducts.map((product) => {
          return (
            <div
              data-test-id={`cart-product-${product.slug}`}
              key={`product-${product.slug}`}
              className="flex items-center mx-[50px] my-[20px] justify-start gap-x-3"
            >
              <Link
                className="text-[21px] font-medium"
                href={`/products/${product.slug}`}
              >
                {product.image && (
                  <div className="h-[70px] flex items-center justify-center">
                    <img
                      data-test-id="product-image"
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-[70px]"
                    />
                  </div>
                )}
              </Link>
              <br />
              <Link
                className="text-[21px] font-medium flex-1 mr-5"
                href={`/products/${product.slug}`}
              >
                {product.name}
              </Link>
              <p
                className="text-[21px] font-medium w-[50px]"
                data-test-id={`cart-product-quantity-${product.slug}`}
              >
                {product.amount}
              </p>
              <p className="text-[21px] font-medium w-[50px] ">
                €&nbsp;
                <span
                  className=""
                  data-test-id={`cart-product-subtotal-${product.slug}`}
                >
                  {(product.subtotal / 100).toFixed(2)}
                </span>
              </p>
            </div>
          );
        })}
      </div>
      <div className="">
        <h2 className="text-[27px] font-semibold">Your Details</h2>
        <CheckoutForm total={total} />
      </div>
    </div>
  );
}
