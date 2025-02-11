import { getProduct } from '../../../database/products';
import EditProductForm from './EditProductForm';

export async function generateMetadata(props) {
  const singleProduct = getProduct(Number((await props.params).productId));
  return {
    title: singleProduct.name,
    description: `Read all the details about our offers for ${singleProduct.name}`,
  };
}

export default async function SingleProduct(props) {
  const singleProduct = await getProduct(
    Number((await props.params).productId),
  );
  return (
    <div>
      <h1>Edit Product Details</h1>
      <EditProductForm
        id={singleProduct.id}
        productName={singleProduct.name}
        image={singleProduct.image}
        price={singleProduct.price}
      />
    </div>
  );
}
