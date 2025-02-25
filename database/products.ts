import { cache } from 'react';
import { checkAdmin } from '../util/checkAdmin';
import { sql } from './connect';

export type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  slug: string;
  description: string;
};

export const getProductsInsecure = cache(async () => {
  return await sql<Product[]>`
    SELECT
      *
    FROM
      products
  `;
});

export const getProductInsecure = cache(async (id: number) => {
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

export const getProductBySlugInsecure = cache(async (slug: string) => {
  const product = await sql<Product[]>`
    SELECT
      *
    FROM
      products
    WHERE
      slug = ${slug}
  `;

  return product[0];
});

export const updateProductInsecure = cache(
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

export const createProductInsecure = cache(
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

export const deleteProductInsecure = cache(async (id: number) => {
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
