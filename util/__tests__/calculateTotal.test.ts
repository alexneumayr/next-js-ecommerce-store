import { expect, test } from '@jest/globals';
import { calculateTotal } from '../calculateTotal';

test('Add the values of the subtotal properties all objects in the array', () => {
  expect(
    calculateTotal([{ subtotal: 1 }, { subtotal: 2 }, { subtotal: 3 }]),
  ).toBe(6);
  expect(calculateTotal([{ subtotal: 5 }, { subtotal: 10 }])).toBe(15);
});

test('throws an error when subtotal has invalid datatype', () => {
  expect(() =>
    // @ts-expect-error Test for invalid parameter types
    calculateTotal([{ subtotal: 'ABC' }, { subtotal: 'XYZ' }]),
  ).toThrow(
    'Input must be an array with objects containing the property subtotal (number)',
  );
  expect(() =>
    // @ts-expect-error Test for invalid parameter types
    calculateTotal([{ subtotal: '' }, { subtotal: '' }]),
  ).toThrow(
    'Input must be an array with objects containing the property subtotal (number)',
  );
  expect(() =>
    // @ts-expect-error Test for invalid parameter types
    calculateTotal([123, 123]),
  ).toThrow(
    'Input must be an array with objects containing the property subtotal (number)',
  );
  expect(() =>
    // @ts-expect-error Test for invalid parameter types
    calculateTotal('hello'),
  ).toThrow(
    'Input must be an array with objects containing the property subtotal (number)',
  );
  expect(() =>
    // @ts-expect-error Test for invalid parameter types
    calculateTotal(),
  ).toThrow(
    'Input must be an array with objects containing the property subtotal (number)',
  );
});
