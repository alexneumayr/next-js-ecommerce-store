import Link from 'next/link.js';
import AddToCartButton from '../../components/AddToCartButton';
import { getProductsInsecure } from '../../database/products';

export const metadata = {
  title: 'Products',
  description:
    'Explore the latest tech at great prices. From smartphones to accessories, we have everything you need to stay connected.',
};

export default async function ProductPage() {
  const products = await getProductsInsecure();
  return (
    <div className="mx-[80px]">
      <h1 className="text-[45px] font-bold">Products Overview</h1>
      <div className="flex flex-wrap gap-5 justify-around my-4  overflow-hidden">
        {products.map((product) => {
          return (
            <div
              key={`product-${product.slug}`}
              className="relative flex-auto before:content-[''] before:bg-zinc-500 before:h-full before:w-[1px]  before:absolute before:top-[0px] before:left-[1px] before:bottom-[0px] left-[-2px] before:will-change-transform

"
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
                        className="max-h-full max-w-[137px] "
                      />
                    </div>
                  )}

                  <p className="text-[19px] font-bold my-5 text-center">
                    {product.name}
                  </p>
                </Link>
                <div className="flex items-center justify-around mt-auto">
                  <p className="text-black text-[25px] font-bold">
                    € {(product.price / 100).toFixed(2)}
                  </p>
                  <AddToCartButton />
                </div>
                <br />
                <br />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
