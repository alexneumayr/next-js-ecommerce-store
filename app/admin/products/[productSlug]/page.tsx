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

/* Fetches the product with the slug from the params from the database and stores it in "singleProduct". If the product data can't be fetched it shows the "Not Found" page. */
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
    <div className="mx-[80px] mt-3">
      <h1 className="text-[45px] font-bold">Edit Product Details</h1>
      {/* Loads the main component of the page */}
      <EditProductForm product={product} />
    </div>
  );
}
