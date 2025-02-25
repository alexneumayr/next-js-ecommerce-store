import { z } from 'zod';

// Define the schema for the validation with zod
const basicCartArraySchema = z.array(
  z.object({
    id: z.number(),
    amount: z.number(),
  }),
);

export function addOrUpdateCart(
  cart: z.infer<typeof basicCartArraySchema>,
  productId: number,
  amount: number,
) {
  // Parses the cart with zod
  const validatedCart = basicCartArraySchema.safeParse(cart);
  // Throws an error if "cart", "productId" or "amount" have the wrong datatypes
  if (
    !validatedCart.success ||
    typeof productId !== 'number' ||
    typeof amount !== 'number'
  ) {
    throw new Error(
      'Invalid parameters!\nParameter cart must be an array containing the properties productId (number) and amount (number).\nParameter productId must be a number.\nParameter amount must be a number.',
    );
  }

  // Copies the validated "cart" to the new array "newCart"
  const newCart = [...validatedCart.data];
  // Tries to find a product in "newCart" where the ID matches the one from the parameters
  const productToUpdate = newCart.find((productInCart) => {
    return productInCart.id === productId;
  });
  /* If the product isn't already in the cart and "amount" is 1 or greater,
  it returns an array where an object {id: <productId>, amount: <amount>} is attached
  to the previous content of "cart" */
  if (!productToUpdate && amount >= 1) {
    return [...newCart, { id: productId, amount: amount }];
  }
  // Throws an error if the product isn't already in the cart and "amount" is smaller than 1
  else if (!productToUpdate && amount < 1) {
    throw new Error("A product with amount < 1 can't be added to the cart");
  } else if (productToUpdate && amount < 1) {
    /* If the product is already in the cart and "amount" is smaller than 1,
  it returns the cart array without the product */
    return newCart.filter((product) => product.id !== productToUpdate.id);
  } else if (productToUpdate && amount >= 1) {
    /* If the product is already in the cart and "amount" is 1 or greater,
  it returns the cart array with the updated amount of that product. */
    productToUpdate.amount = amount;
    return newCart;
  }
}
