import 'react-multi-carousel/lib/styles.css';
import { getProductsInsecure } from '../database/products';
import CarouselArea from './CarouselArea';

export default async function HomePage() {
  const products = await getProductsInsecure();

  return (
    <>
      <div className="mx-8">
        <img
          className="w-[1280px] rounded-[25px] mx-auto my-8"
          src="sales.png"
          alt="Tech Week Sales"
        />
      </div>
      <div>
        <div className="pb-8 mb-3 relative max-w-[1350px] mx-auto">
          <CarouselArea products={products} />
        </div>
      </div>
    </>
  );
}
