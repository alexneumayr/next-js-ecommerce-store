'use client';
import 'react-multi-carousel/lib/styles.css';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import CartIconButton from '../components/CartIconButton';
import { createOrUpdateCookie } from '../util/cookies';

Carousel = Carousel.default ? Carousel.default : Carousel;

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
// max-h-[125px] max-w-[200px]
export default function AddToCartButton({ products }) {
  return (
    <div className="space-x-10">
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={false} // means to render carousel on server-side.
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        removeArrowOnDeviceType=""
        dotListClass="custom-dot-list-style"
        renderDotsOutside
        className="mx-auto"
      >
        {products.map((product) => {
          return (
            <div
              key={`product-${product.slug}`}
              className="flex flex-col mx-3 h-full p-4  rounded-[25px] border border-[#555555]"
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
                <p className="text-black text-[25px] font-bold">
                  € {(product.price / 100).toFixed(2)}
                </p>
                <button
                  className="flex p-2 justify-center gap-2 items-center text-[13px] font-semibold rounded-[5px] bg-primary w-[130px] text-white cursor-pointer hover:bg-[#00b755d6]"
                  onClick={async () => {
                    await createOrUpdateCookie(product.id, 1);
                  }}
                >
                  <CartIconButton /> Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
