import Link from 'next/link';
import { getProducts } from '../../database/products';

export const metadata = {
  title: 'Admin',
  description: 'This is the admin area for managing the products.',
};

export default async function AdminProductPage() {
  const products = await getProducts();
  return (
    <div>
      <h1>Admin - Products Overview</h1>
      {products.map((product) => {
        return (
          <Link
            href={`products/${product.slug}`}
            data-test-id={`products/product-${product.slug}`}
            key={`product-${product.slug}`}
          >
            {product.image && (
              <div className="product-image-container-overview">
                <img
                  data-test-id="product-image"
                  src={product.image}
                  alt={product.name}
                  className="product-image-overview"
                />
              </div>
            )}
            Name: {product.name}
            <br />
            Price: {(product.price / 100).toFixed(2)}
            <br />
            <br />
          </Link>
        );
      })}
    </div>
  );
}
