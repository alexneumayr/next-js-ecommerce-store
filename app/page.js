import 'react-multi-carousel/lib/styles.css';
import { getProductsInsecure } from '../database/products';
import CarouselArea from './CarouselArea';

export default async function HomePage() {
  // Fetches all products from the database
  const products = await getProductsInsecure();

  return (
    <>
      {/* Shows an image providing information about the current sales promotion. */}
      <div className="mx-[25px]">
        <img
          className="w-[1280px] rounded-[25px] mx-auto my-8"
          src="sales.png"
          alt="Tech Week Sales"
        />
      </div>
      <div>
        {/* Displays a carousel that shows the image, name, price and a "Add to Cart" button
         for the first 8 products fetched from the database. */}
        <div className="pb-8 mb-3 relative mx-[15px]">
          <CarouselArea products={products} />
        </div>
      </div>
    </>
  );
}
