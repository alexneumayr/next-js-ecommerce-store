import { expect, test } from '@jest/globals';
import { addOrUpdateCart } from '../addOrUpdateCart';

test('correctly add a product to the cart array or update its quantity', () => {
  expect(addOrUpdateCart([], 10, 1)).toStrictEqual([{ id: 10, amount: 1 }]);
  expect(
    addOrUpdateCart(
      [
        { id: 10, amount: 0 },
        { id: 11, amount: 5 },
      ],
      10,
      1,
    ),
  ).toStrictEqual([
    { id: 10, amount: 1 },
    { id: 11, amount: 5 },
  ]);
  expect(
    addOrUpdateCart(
      [
        { id: 10, amount: 1 },
        { id: 11, amount: 5 },
      ],
      10,
      0,
    ),
  ).toStrictEqual([{ id: 11, amount: 5 }]);
});

test('throws an error when a product with amount = 0 would be added the cart', () => {
  expect(() => addOrUpdateCart([], 10, 0)).toThrow(
    "A product with amount = 0 can't be added to the cart",
  );
});

test('throws an error when the function is called with invalid inputs', () => {
  // @ts-expect-error Test for invalid parameter types
  expect(() => addOrUpdateCart(123, 10, 0)).toThrow(
    'Invalid parameters!\nParameter cart must be an array containing the properties productId (number) and amount (number).\nParameter productId must be a number.\nParameter amount must be a number.',
  );
  // @ts-expect-error Test for invalid parameter types
  expect(() => addOrUpdateCart([], 'abc', 0)).toThrow(
    'Invalid parameters!\nParameter cart must be an array containing the properties productId (number) and amount (number).\nParameter productId must be a number.\nParameter amount must be a number.',
  );
  // @ts-expect-error Test for invalid parameter types
  expect(() => addOrUpdateCart([], 10, 'abc')).toThrow(
    'Invalid parameters!\nParameter cart must be an array containing the properties productId (number) and amount (number).\nParameter productId must be a number.\nParameter amount must be a number.',
  );
  // @ts-expect-error Test for invalid parameter types
  expect(() => addOrUpdateCart(123, 'abc', 'abc')).toThrow(
    'Invalid parameters!\nParameter cart must be an array containing the properties productId (number) and amount (number).\nParameter productId must be a number.\nParameter amount must be a number.',
  );
  // @ts-expect-error Test for invalid parameter types
  expect(() => addOrUpdateCart()).toThrow(
    'Invalid parameters!\nParameter cart must be an array containing the properties productId (number) and amount (number).\nParameter productId must be a number.\nParameter amount must be a number.',
  );
});
