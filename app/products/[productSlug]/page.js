import { getProductBySlug } from '../../database/products';
import AddToCartForm from './AddToCartForm';

export async function generateMetadata(props) {
  const singleProduct = await getProductBySlug(
    (await props.params).productSlug,
  );
  return {
    title: singleProduct.name,
    description: `Read all the details about our offers for ${singleProduct.name}`,
  };
}

export default async function SingleProduct(props) {
  const singleProduct = await getProductBySlug(
    (await props.params).productSlug,
  );
  return (
    <div>
      <h1>{singleProduct.name}</h1>
      <br />
      <div>{singleProduct.description}</div>
      <br />
      Image: <span data-test-id="product-image">{singleProduct.image}</span>
      <br />
      <br /> Price:
      <div style={{ display: 'inline' }} data-test-id="product-price">
        {(singleProduct.price / 100).toFixed(2)}
      </div>
      €
      <AddToCartForm id={singleProduct.id} />
    </div>
  );
}
