import { getProductBySlug } from '../../../database/products';
import EditProductForm from './EditProductForm';

export async function generateMetadata(props) {
  const singleProduct = getProductBySlug((await props.params).productSlug);
  return {
    title: 'Admin',
    description: `This is the admin page for managing the product information for ${singleProduct.name}`,
  };
}

export default async function SingleProduct(props) {
  const singleProduct = await getProductBySlug(
    (await props.params).productSlug,
  );
  const product = {
    id: singleProduct.id,
    name: singleProduct.name,
    image: singleProduct.image,
    price: (singleProduct.price / 100).toFixed(2),
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
