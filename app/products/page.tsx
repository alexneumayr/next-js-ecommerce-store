import Link from 'next/link.js';
import { getProducts } from '../../database/products';

export const metadata = {
  title: 'Products',
  description:
    'Explore the latest tech at great prices. From smartphones to accessories, we have everything you need to stay connected.',
};

export default async function ProductPage() {
  const products = await getProducts();
  return (
    <div>
      <h1>Our products</h1>

      {products.map((product) => {
        return (
          <Link
            href={`products/${product.slug}`}
            data-test-id={`product-${product.slug}`}
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
