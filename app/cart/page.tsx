import Link from 'next/link';
import RemoveButtonIcon from '../../components/RemoveButtonIcon';
import { getProductsInsecure } from '../../database/products';
import { calculateTotal } from '../../util/calculateTotal';
import { getCookie } from '../../util/cookies';
import { extendCartProductDetails } from '../../util/extendCartProductDetails';
import { parseJson } from '../../util/json';
import AmountField from './AmountField';
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
    <div className="mx-[80px] mt-3">
      <h1 className="text-[45px] font-bold">Cart</h1>
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
      <div className="flex justify-between">
        <p className="text-[27px] font-semibold">Total:</p>{' '}
        <p className="text-[27px] font-semibold">
          €&nbsp;
          <span data-test-id="cart-total">{(total / 100).toFixed(2)}</span>
        </p>
      </div>
      <br />
      <CheckoutButton className="ml-auto" />
      <br />
      <br />
    </div>
  );
}
