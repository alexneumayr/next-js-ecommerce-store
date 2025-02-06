import { getProduct } from '@/app/database/products';
import AddToCartForm from './AddToCartForm';

export async function generateMetadata(props) {
  const singleProduct = getProduct(Number((await props.params).productId));
  return {
    title: singleProduct.name,
    description: `Read all the details about our offers for ${singleProduct.name}`,
  };
}

export default async function SingleProduct(props) {
  const singleProduct = getProduct(Number((await props.params).productId));
  return (
    <div>
      <h1>{singleProduct.name}</h1>
      Image: <span data-test-id="product-image">{singleProduct.image}</span>
      <br />
      Price:
      <div style={{ display: 'inline' }} data-test-id="product-price">
        {singleProduct.price}
      </div>{' '}
      €
      <AddToCartForm id={singleProduct.id} />
    </div>
  );
}
