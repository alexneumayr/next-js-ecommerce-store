import Link from 'next/link.js';
import { getProducts } from '../database/products.js';

export const metadata = {
  title: 'Products',
  description:
    'Explore the latest tech at great prices. From smartphones to accessories, we have everything you need to stay connected.',
};

export default function ProductPage() {
  const products = getProducts();

  return (
    <div>
      <h1>Our products</h1>
      {products.map((product) => {
        return (
          <Link href={`products/${product.id}`}>
            Name: {product.name}
            <br />
            Image: {product.image}
            <br />
            Price: {product.price}
            <br />
            <br />
          </Link>
        );
      })}
    </div>
  );
}
