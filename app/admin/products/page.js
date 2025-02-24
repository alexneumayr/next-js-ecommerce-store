import { getProductsInsecure } from '../../../database/products';
import EditProductButton from './EditProductButton';

export const metadata = {
  title: 'Admin',
  description: 'This is the admin area for managing the products.',
};

export default async function AdminProductPage() {
  const products = await getProductsInsecure();
  return (
    <div className="mx-[80px] mt-3">
      <h1 className="text-[45px] font-bold">Select a product to edit</h1>
      <div className="flex flex-wrap gap-5 justify-around my-4  overflow-hidden">
        {products.map((product) => {
          return (
            <div
              key={`product-${product.slug}`}
              className="relative flex-auto before:content-[''] before:bg-zinc-400 before:h-full before:w-[1px]  before:absolute before:top-[0px] before:left-[1px] before:bottom-[0px] left-[-2px] before:will-change-transform py-3"
            >
              <div className="max-w-[250px] flex flex-col mx-auto h-full ">
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
                <p className="text-[19px] font-bold my-5 text-center">
                  {product.name}
                </p>
                <div className="flex items-center justify-around mt-auto">
                  <p className="text-black text-[25px] font-bold">
                    € {(product.price / 100).toFixed(2)}
                  </p>
                  <EditProductButton slug={product.slug} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
