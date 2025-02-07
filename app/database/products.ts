import { cache } from 'react';
import { sql } from './connect';

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
};

export const getProducts = cache(async () => {
  return await sql<Product[]>`
    SELECT
      *
    FROM
      products
  `;
});

export const getProduct = cache(async (id: number) => {
  const product = await sql<Product[]>`
    SELECT
      *
    FROM
      products
    WHERE
      id = ${id}
  `;
  return product[0];
});
