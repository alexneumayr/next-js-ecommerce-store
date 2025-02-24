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
    <div className="mx-[80px] mt-3">
      <div className="flex gap-5 justify-around items-start my-8">
        <div className="flex-1 max-w-[480px] min-w-[150px] p-5 self-center">
          <img
            data-test-id="product-image"
            src={singleProduct.image}
            alt={singleProduct.name}
            className=""
          />
        </div>
        <div className="bg-zinc-500 w-[1px] self-stretch will-change-transform" />
        <div className="flex-1 p-5 ">
          <h1 className="text-[clamp(15px,3vw,45px)] font-bold">
            {singleProduct.name}
          </h1>
          <p className="my-5 text-[clamp(15px,2.5vw,31px)] font-bold">
            €&nbsp;
            <span data-test-id="product-price">
              {(singleProduct.price / 100).toFixed(2)}
            </span>
          </p>

          <AddToCartForm id={singleProduct.id} />
          <br />
        </div>
      </div>
      <h2 className="h-11 text-black text-4xl font-bold">Product Details</h2>
      <div
        className="text-xl my-6 max-w-[1000px]"
        dangerouslySetInnerHTML={{ __html: singleProduct.description }}
      />
    </div>
  );
}
