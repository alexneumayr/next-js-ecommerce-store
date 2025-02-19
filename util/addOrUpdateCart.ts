import { z } from 'zod';

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
  const validatedCart = basicCartArraySchema.safeParse(cart);
  if (
    !validatedCart.success ||
    typeof productId !== 'number' ||
    typeof amount !== 'number'
  ) {
    throw new Error(
      'Invalid parameters!\nParameter cart must be an array containing the properties productId (number) and amount (number).\nParameter productId must be a number.\nParameter amount must be a number.',
    );
  }

  const newCart = [...validatedCart.data];
  const productToUpdate = newCart.find((productInCart) => {
    return productInCart.id === productId;
  });
  if (!productToUpdate && amount !== 0) {
    return [...newCart, { id: productId, amount: amount }];
  } else if (!productToUpdate && amount === 0) {
    throw new Error("A product with amount = 0 can't be added to the cart");
  } else if (productToUpdate && amount === 0) {
    return newCart.filter((product) => product.id !== productToUpdate.id);
  } else if (productToUpdate && amount !== 0) {
    productToUpdate.amount = amount;
    return newCart;
  }
}
