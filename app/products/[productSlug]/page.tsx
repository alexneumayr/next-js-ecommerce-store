import { notFound } from 'next/navigation';
import { getProductBySlug } from '../../database/products';
import AddToCartForm from './AddToCartForm';

type Props = {
  params: Promise<{ productSlug: string }>;
};

export async function generateMetadata(props: Props) {
  const singleProduct = await getProductBySlug(
    (await props.params).productSlug,
  );
  return {
    title: singleProduct?.name,
    description: `Read all the details about our offers for ${singleProduct?.name}`,
  };
}

export default async function SingleProduct(props: Props) {
  const singleProduct = await getProductBySlug(
    (await props.params).productSlug,
  );

  if (!singleProduct) {
    notFound();
  }

  return (
    <div>
      <h1>{singleProduct.name}</h1>
      <br />
      <div
        className="description"
        dangerouslySetInnerHTML={{ __html: singleProduct.description }}
      />
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
