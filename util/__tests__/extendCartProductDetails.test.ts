import { expect, test } from '@jest/globals';
import { extendCartProductDetails } from '../extendCartProductDetails';

const basicCart = [
  {
    id: 1,
    amount: 5,
  },
  {
    id: 2,
    amount: 3,
  },
];

const allProducts = [
  {
    id: 1,
    name: 'Intenso Speed Line 64GB Memory Stick USB 3.2 Gen 1x1, Black',
    slug: 'intenso-speed-line-64gb-memory-stick-usb-3-2-gen-1x1-black',
    image:
      'https://res.cloudinary.com/duayl4vkp/image/upload/v1739817004/wtfusfu0xivvs1ldnews.jpg',
    price: 2000,
    description: `<b>The Intenso Speed Line is a powerful USB stick for all users who value fast data transfer.</b><div><br /></div><div>Thanks to its USB 3.2 Gen1x1 interface, it can reach up to 10 times higher transfer speeds than standard USB 2.0 sticks.</div><div><br /></div><div>Furthermore, the Speed Line is characterised by particularly high storage capacities of up to 256 GB, which is why it offers sufficient storage space for countless photos, videos, music and other memory-intensive files.</div>`,
  },
  {
    id: 2,
    name: 'PHIXERO P500 SSD Internal Hard Drive 1TB',
    slug: 'phixero-p500-ssd',
    image:
      'https://res.cloudinary.com/duayl4vkp/image/upload/v1739816942/ytaga7llufbgdmluxzok.jpg',
    price: 2500,
    description: `<b>Increase Efficiency</b><div><br /></div><div>Experience the efficiency of 3D NAND, where our advanced components are designed for optimal performance from start to finish, resulting in very low power consumption of the PHIXERO P500.</div><div><br /></div><div>With the PHIXERO internal SSD, you can get your system up and running in just under 8 seconds.</div><div><br /></div><div>With read speeds of 550 MB/s and write speeds of 480 MB/s, you can run more demanding applications.</div>`,
  },
];

const combinedProducts = [
  {
    id: 1,
    name: 'Intenso Speed Line 64GB Memory Stick USB 3.2 Gen 1x1, Black',
    slug: 'intenso-speed-line-64gb-memory-stick-usb-3-2-gen-1x1-black',
    image:
      'https://res.cloudinary.com/duayl4vkp/image/upload/v1739817004/wtfusfu0xivvs1ldnews.jpg',
    price: 2000,
    amount: 5,
    subtotal: 10000,
  },
  {
    id: 2,
    name: 'PHIXERO P500 SSD Internal Hard Drive 1TB',
    slug: 'phixero-p500-ssd',
    image:
      'https://res.cloudinary.com/duayl4vkp/image/upload/v1739816942/ytaga7llufbgdmluxzok.jpg',
    price: 2500,
    amount: 3,
    subtotal: 7500,
  },
];

test('combine product data with the product quantity from the cart', () => {
  expect(extendCartProductDetails(basicCart, allProducts)).toStrictEqual(
    combinedProducts,
  );
});

test('throws an error when basicCart is given invalid inputs', () => {
  expect(() =>
    // @ts-expect-error Test for invalid parameter type
    extendCartProductDetails([{ id: 1, amount: 'abc' }], allProducts),
  ).toThrow(
    'Parameter basicCart must be an array with properties id (number) and amount (number). And parameter allProducts must be an array with properties id (number), name (string), slug (string), price (number), image (string).',
  );
  expect(() =>
    // @ts-expect-error Test for invalid parameter type
    extendCartProductDetails(123, allProducts),
  ).toThrow(
    'Parameter basicCart must be an array with properties id (number) and amount (number). And parameter allProducts must be an array with properties id (number), name (string), slug (string), price (number), image (string).',
  );
});

test('throws an error when allProducts is given invalid input', () => {
  expect(() =>
    extendCartProductDetails(
      basicCart,
      // @ts-expect-error Test for invalid parameter type
      [{ id: 'abc', name: 123, slug: 123, price: 'abc', image: 123 }],
    ),
  ).toThrow(
    'Parameter basicCart must be an array with properties id (number) and amount (number). And parameter allProducts must be an array with properties id (number), name (string), slug (string), price (number), image (string).',
  );
  expect(() =>
    extendCartProductDetails(
      basicCart,
      // @ts-expect-error Test for invalid parameter type
      123,
    ),
  ).toThrow(
    'Parameter basicCart must be an array with properties id (number) and amount (number). And parameter allProducts must be an array with properties id (number), name (string), slug (string), price (number), image (string).',
  );
});

test('throws an error when all parameters is given invalid input', () => {
  expect(() =>
    extendCartProductDetails(
      // @ts-expect-error Test for invalid parameter types
      'abc',
      123,
    ),
  ).toThrow(
    'Parameter basicCart must be an array with properties id (number) and amount (number). And parameter allProducts must be an array with properties id (number), name (string), slug (string), price (number), image (string).',
  );
  expect(() =>
    extendCartProductDetails(
      // @ts-expect-error Test for invalid parameter types
      [{ id: 1, amount: 'abc' }],
      [{ id: 'abc', name: 123, slug: 123, price: 'abc', image: 123 }],
    ),
  ).toThrow(
    'Parameter basicCart must be an array with properties id (number) and amount (number). And parameter allProducts must be an array with properties id (number), name (string), slug (string), price (number), image (string).',
  );
});
