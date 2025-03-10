import Link from 'next/link.js';
import QuickAddToCartButton from '../../components/QuickAddToCartButton';
import { getProductsInsecure } from '../../database/products';

export const metadata = {
  title: 'Products',
  description:
    'Explore the latest tech at great prices. From smartphones to accessories, we have everything you need to stay connected.',
};

export default async function ProductPage() {
  /* Fetches all products and stores it in a variable */
  const products = await getProductsInsecure();
  return (
    <div className="mx-[80px] mt-3">
      <h1 className="text-[45px] font-bold">Products Overview</h1>
      <div className="flex flex-wrap gap-5 justify-around my-4  overflow-hidden">
        {/* Goes through the array with the products and displays a container with the product image, name, price and an "Add to Cart" button for each product. */}
        {products.map((product) => {
          return (
            <div
              key={`product-${product.slug}`}
              className="relative flex-auto before:content-[''] before:bg-zinc-400 before:h-full before:w-[1px]  before:absolute before:top-[0px] before:left-[1px] before:bottom-[0px] left-[-2px] before:will-change-transform py-3"
            >
              <div className="max-w-[250px] flex flex-col mx-auto h-full ">
                <Link
                  href={`products/${product.slug}`}
                  data-test-id={`product-${product.slug}`}
                >
                  {product.image && (
                    <div className="h-[137px] flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-[137px]"
                      />
                    </div>
                  )}

                  <p className="text-[19px] font-bold my-5 text-center">
                    {product.name}
                  </p>
                </Link>
                <div className="flex items-center justify-around mt-auto">
                  <p className="text-[25px] font-bold">
                    € {(product.price / 100).toFixed(2)}
                  </p>
                  <QuickAddToCartButton id={product.id} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
