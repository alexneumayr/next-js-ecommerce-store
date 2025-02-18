import { z } from 'zod';

const basicCartItemSchema = z.object({
  id: z.number(),
  amount: z.number(),
});

const basicCartArraySchema = z.array(basicCartItemSchema);

const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  image: z.string(),
  price: z.number(),
  description: z.string().optional(),
});

const productsArraySchema = z.array(productSchema);

export function extendCartProductDetails(
  basicCart: z.infer<typeof basicCartItemSchema>[],
  allProducts: z.infer<typeof productSchema>[],
) {
  const validatedBasicCart = basicCartArraySchema.safeParse(basicCart);
  const validatedAllProducts = productsArraySchema.safeParse(allProducts);

  if (!validatedBasicCart.success) {
    throw new Error(
      'Parameter basicCart must be an array with properties id (number) and amount (number). And parameter allProducts must be an array with properties id (number), name (string), slug (string), price (number), image (string).',
    );
  }

  if (!validatedAllProducts.success) {
    throw new Error(
      'Parameter basicCart must be an array with properties id (number) and amount (number). And parameter allProducts must be an array with properties id (number), name (string), slug (string), price (number), image (string).',
    );
  }

  return validatedAllProducts.data
    .map((product) => {
      const correlatingCartProduct = validatedBasicCart.data.find(
        (item) => item.id === product.id,
      );
      if (correlatingCartProduct !== undefined) {
        return {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          image: product.image,
          amount: correlatingCartProduct.amount,
          subtotal: product.price * correlatingCartProduct.amount,
        };
      } else {
        return null;
      }
    })
    .filter((product) => product !== null);
}
