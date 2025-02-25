import { z } from 'zod';

// Defines the schema for validating "basicCart" with zod
const basicCartArraySchema = z.array(
  z.object({
    id: z.number(),
    amount: z.number(),
  }),
);

// Defines the schema for validating "allProducts" with zod
const productsArraySchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    image: z.string(),
    price: z.number(),
    description: z.string().optional(),
  }),
);

/* The function extends "basicCart" which only contains the ID and
the amount of the products with the product details from "allProducts" */
export function extendCartProductDetails(
  basicCart: z.infer<typeof basicCartArraySchema>,
  allProducts: z.infer<typeof productsArraySchema>,
) {
  // Parses "basicCart" and "allProducts" with zod
  const validatedBasicCart = basicCartArraySchema.safeParse(basicCart);
  const validatedAllProducts = productsArraySchema.safeParse(allProducts);

  // Throws an error if "basicCart" has the wrong datatype
  if (!validatedBasicCart.success) {
    throw new Error(
      'Parameter basicCart must be an array with properties id (number) and amount (number). And parameter allProducts must be an array with properties id (number), name (string), slug (string), price (number), image (string).',
    );
  }

  // Throws an error if "allProducts" has the wrong datatype
  if (!validatedAllProducts.success) {
    throw new Error(
      'Parameter basicCart must be an array with properties id (number) and amount (number). And parameter allProducts must be an array with properties id (number), name (string), slug (string), price (number), image (string).',
    );
  }

  /* Returns an array where the products contained in "basicCart" are extended
  by the product details from "allProducts" */
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
