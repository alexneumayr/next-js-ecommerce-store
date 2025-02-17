import { notFound } from 'next/navigation';
import {
  getProductBySlugInsecure,
  type Product,
} from '../../../../database/products';
import EditProductForm from './EditProductForm';

type Props = {
  params: Promise<{ productSlug: string }>;
};

export async function generateMetadata(props: Props) {
  const singleProduct = await getProductBySlugInsecure(
    (await props.params).productSlug,
  );
  return {
    title: 'Admin',
    description: `This is the admin page for managing the product information for ${singleProduct?.name}`,
  };
}

export default async function SingleProduct(props: Props) {
  const singleProduct = await getProductBySlugInsecure(
    (await props.params).productSlug,
  );

  if (!singleProduct) {
    notFound();
  }

  const product: Product = {
    id: singleProduct.id,
    name: singleProduct.name,
    image: singleProduct.image,
    price: singleProduct.price,
    slug: singleProduct.slug,
    description: singleProduct.description,
  };

  return (
    <div>
      <h1>Edit Product Details</h1>
      <EditProductForm product={product} />
    </div>
  );
}
