import Link from 'next/link';
import { getProductsInsecure } from '../../database/products';
import { calculateTotal } from '../../util/calculateTotal';
import { getCookie } from '../../util/cookies';
import { extendCartProductDetails } from '../../util/extendCartProductDetails';
import { parseJson } from '../../util/json';
import AmountField from './AmountField';
import CheckoutButton from './CheckoutButton';
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
  // Gets cart cookie content
  const cartCookie = await getCookie('cart');
  // Returns the parsed cookie or an empty array if cookie doesn't exist
  const basicCart: BasicCart[] = parseJson(cartCookie) || [];
  // Fetches all products from the database
  const allProducts = await getProductsInsecure();
  /* Extends the cart content which only contains the ID and the amount of the products
  with the product details from the fetched products */
  const cartProducts = extendCartProductDetails(basicCart, allProducts);

  /* Calculates the sum of all cart products */
  const total = calculateTotal(cartProducts);

  return (
    <div className="mx-[80px] mt-3">
      <h1 className="text-[45px] font-bold">Cart</h1>
      {basicCart.length > 0 ? (
        <div className="flex flex-col mb-10">
          <div className="rounded-[25px] border border-[#878787] min-w-[700px] my-5">
            {/* If there are products in the cart it shows a container with the images, names and prices of the products and also elements to see and change the quantity */}
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
                      <div className="h-[137px] flex items-center justify-center">
                        <img
                          data-test-id="product-image"
                          src={product.image}
                          alt={product.name}
                          className="max-h-full max-w-[137px]"
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
                  <AmountField
                    id={product.id}
                    slug={product.slug}
                    currentAmount={product.amount}
                  />
                  <RemoveButton id={product.id} slug={product.slug} />
                  <p className="text-[21px] font-medium w-[60px] ">
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
          {/* Shows the total price of all products and a "Proceed to Checkout" button under the products container */}
          <div className="flex justify-between mb-4">
            <p className="text-[27px] font-semibold">Total:</p>
            <p className="text-[27px] font-semibold">
              €&nbsp;
              <span data-test-id="cart-total">{(total / 100).toFixed(2)}</span>
            </p>
          </div>
          <CheckoutButton className="self-end ml-auto" />
        </div>
      ) : (
        <p className="mb-[400px] text-[21px] font-normal">
          {/* Shows a text if the cart is empty */}
          Nothing in here yet...
        </p>
      )}
    </div>
  );
}
