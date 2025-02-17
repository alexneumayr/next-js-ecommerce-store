import { cache } from 'react';
import { checkAdmin } from '../../util/checkAdmin';
import { sql } from './connect';

export type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  slug: string;
  description: string;
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

export const getProductBySlug = cache(async (slug: string) => {
  const product = await sql<Product[]>`
    SELECT
      *
    FROM
      products
    WHERE
      slug = ${slug}
  `;
  console.log(product);

  return product[0];
});

// Evtl. Validierung mit zod einfügen!

export const updateProduct = cache(
  async (
    productId: number,
    name: string,
    slug: string,
    image: string,
    price: number,
    description: string,
  ) => {
    if (await checkAdmin()) {
      const product = await sql<Product[]>`
        UPDATE products
        SET
          name = ${name},
          slug = ${slug},
          image = ${image},
          price = ${price},
          description = ${description}
        WHERE
          id = ${productId}
        RETURNING
          products.*
      `;
      return product[0];
    }
  },
);

export const createProduct = cache(
  async (
    name: string,
    slug: string,
    image: string,
    price: number,
    description: string,
  ) => {
    if (await checkAdmin()) {
      const product = await sql<Product[]>`
        INSERT INTO
          products (
            name,
            slug,
            image,
            price,
            description
          )
        VALUES
          (
            ${name},
            ${slug},
            ${image},
            ${price},
            ${description}
          )
        RETURNING
          products.*
      `;
      return product[0];
    }
  },
);

export const deleteProduct = cache(async (id: number) => {
  console.log('Deletion ID', id);
  if (await checkAdmin()) {
    const product = await sql<Product[]>`
      DELETE FROM products
      WHERE
        id = ${id}
      RETURNING
        products.*
    `;
    return product[0];
  }
});

export const findProductsInsecure = cache(async (text: string) => {
  console.log('Search text', text);

  const products = await sql<Product[]>`
    SELECT
      *
    FROM
      products
    WHERE
      name ILIKE ${'%' + text + '%'}
  `;
  return products;
});
