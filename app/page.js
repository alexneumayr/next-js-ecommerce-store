import 'react-multi-carousel/lib/styles.css';
import { getServerSession } from 'next-auth';
import Link from 'next/link.js';
import AddToCartButton from '../components/AddToCartButton';
import CartIconButton from '../components/CartIconButton';
import { getProductsInsecure } from '../database/products';
import { authOptions } from '../util/authOptions';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
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
        <div className="pb-8 mb-3 relative">
          <AddToCartButton products={products} />
        </div>
      </div>
    </>
  );
}
