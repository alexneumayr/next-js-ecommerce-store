import Link from 'next/link';
import { getProducts } from '../../database/products';

export const metadata = {
  title: 'Products',
  description:
    'Explore the latest tech at great prices. From smartphones to accessories, we have everything you need to stay connected.',
};

export default async function AdminProductPage() {
  const products = await getProducts();
  return (
    <div>
      <h1>Admin - Products Overview</h1>
      {products.map((product) => {
        return (
          <Link
            href={`products/${product.id}`}
            data-test-id="products/product-<product id>"
            key={`product-${product.id}`}
          >
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
