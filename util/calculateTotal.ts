export function calculateTotal(cart: { subtotal: number }[]) {
  // Throws an error if "cart" is not an array
  if (!Array.isArray(cart)) {
    throw new Error(
      'Input must be an array with objects containing the property subtotal (number)',
    );
  }

  // Throws an error if the "subtotal" property is not a number
  cart.forEach((cartObject) => {
    if (typeof cartObject.subtotal !== 'number') {
      throw new Error(
        'Input must be an array with objects containing the property subtotal (number)',
      );
    }
  });

  // Returns the sum of all "subtotal" properties
  return cart.reduce(
    (prevValue, currentValue) => prevValue + currentValue.subtotal,
    0,
  );
}
