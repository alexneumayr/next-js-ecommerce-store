export function calculateTotal(cart: { subtotal: number }[]) {
  if (!Array.isArray(cart)) {
    throw new Error(
      'Input must be an array with objects containing the property subtotal (number)',
    );
  }

  cart.forEach((cartObject) => {
    if (typeof cartObject.subtotal !== 'number') {
      throw new Error(
        'Input must be an array with objects containing the property subtotal (number)',
      );
    }
  });

  return cart.reduce(
    (prevValue, currentValue) => prevValue + currentValue.subtotal,
    0,
  );
}
