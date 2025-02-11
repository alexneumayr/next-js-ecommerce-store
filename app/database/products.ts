import { getServerSession } from 'next-auth';
import { cache } from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
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

// Evtl. Validierung mit zod einfügen!

export const updateProduct = cache(async (productId, name, image, price) => {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === 'admin') {
    const product = await sql`
      UPDATE products
      SET
        name = ${name},
        image = ${image},
        price = ${price}
      WHERE
        id = ${productId}
      RETURNING
        products.*
    `;
    return product[0];
  }
});

export const createProduct = cache(async (name, image, price) => {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === 'admin') {
    const product = await sql`
      INSERT INTO
        products (name, image, price)
      VALUES
        (
          ${name},
          ${image},
          ${price}
        )
      RETURNING
        products.*
    `;
    return product[0];
  }
});

export const deleteProduct = cache(async (id) => {
  const session = await getServerSession(authOptions);
  console.log('Deletion ID', id);
  if (session?.user?.role === 'admin') {
    const product = await sql`
      DELETE FROM products
      WHERE
        id = ${id}
      RETURNING
        products.*
    `;
    return product[0];
  }
});

export const findProductsInsecure = cache(async (text) => {
  console.log('Search text', text);

  const products = await sql`
    SELECT
      *
    FROM
      products
    WHERE
      name ILIKE ${'%' + text + '%'}
  `;
  return products;
});
