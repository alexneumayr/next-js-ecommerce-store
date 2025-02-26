'use client';
import 'react-multi-carousel/lib/styles.css';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import AddToCartButton from '../components/QuickAddToCartButton';

Carousel = Carousel.default ? Carousel.default : Carousel;

// Defines how many items are being shown at once at different viewport widths
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  midtablet: {
    breakpoint: { max: 1224, min: 464 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 924, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 673, min: 0 },
    items: 1,
  },
};

export default function CarouselArea({ products }) {
  /* Copies the products array and sets the (maximum) amount of the shown products to 8 */
  const shownProducts = [...products];
  shownProducts.length = 8;

  /* Returns a carousel that shows the image, name, price and a "Add to Cart" button
  for every product contained in "shownProducts" */
  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={false}
      infinite={true}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      removeArrowOnDeviceType=""
      dotListClass="custom-dot-list-style"
      renderDotsOutside
      className="mx-auto max-w-[1300px]"
    >
      {shownProducts.map((product) => {
        return (
          <div
            key={`product-${product.slug}`}
            className="flex flex-col h-[calc(100%-2px)] p-4 max-w-[450px] rounded-[25px] border border-[#555555] mx-[10px]"
          >
            <Link
              href={`products/${product.slug}`}
              data-test-id={`product-${product.slug}`}
            >
              <div className="h-[125px]">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="mx-auto mt-10 max-w-[200px] max-h-full"
                  />
                )}
              </div>
              <p className="text-[19px] text-center font-bold my-5 ">
                {product.name}
              </p>
            </Link>
            <div className="flex items-center justify-around mt-auto">
              <p className="text-[25px] font-bold">
                € {(product.price / 100).toFixed(2)}
              </p>
              <AddToCartButton id={product.id} />
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
