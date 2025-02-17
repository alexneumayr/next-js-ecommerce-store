import { notFound } from 'next/navigation';
import { getProductBySlugInsecure } from '../../../database/products';
import AddToCartForm from './AddToCartForm';

type Props = {
  params: Promise<{ productSlug: string }>;
};

export async function generateMetadata(props: Props) {
  const singleProduct = await getProductBySlugInsecure(
    (await props.params).productSlug,
  );
  return {
    title: singleProduct?.name,
    description: `Read all the details about our offers for ${singleProduct?.name}`,
  };
}

export default async function SingleProduct(props: Props) {
  const singleProduct = await getProductBySlugInsecure(
    (await props.params).productSlug,
  );

  if (!singleProduct) {
    notFound();
  }

  return (
    <div>
      <h1>{singleProduct.name}</h1>
      <br />
      <div className="product-image-container">
        <img
          data-test-id="product-image"
          src={singleProduct.image}
          alt={singleProduct.name}
          className="product-image"
        />
      </div>
      <br />
      <div
        className="description"
        dangerouslySetInnerHTML={{ __html: singleProduct.description }}
      />
      <br /> Price:
      <div style={{ display: 'inline' }} data-test-id="product-price">
        {(singleProduct.price / 100).toFixed(2)}
      </div>
      €
      <AddToCartForm id={singleProduct.id} />
      <br />
    </div>
  );
}
