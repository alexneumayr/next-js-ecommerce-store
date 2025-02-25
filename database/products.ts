import { cache } from 'react';
import sanitizeHtml from 'sanitize-html';
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

// Returns all products from the database
export const getProductsInsecure = cache(async () => {
  return await sql<Product[]>`
    SELECT
      *
    FROM
      products
  `;
});

// Returns the product from the database which matches the slug
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

/* Updates the product in the database (where the id matches) with the values from the parameters. Although the function name contains "Insecure" it is a secure function
because the query only gets executed when the user is logged in and has
the role "admin". It is named this way because otherwise ESLint shows an error. */
export const updateProductInsecure = cache(
  async (
    productId: number,
    name: string,
    slug: string,
    image: string,
    price: number,
    description: string,
  ) => {
    /* The values from "description" gets processed by sanitizeHTML
    to prevent XSS. */
    const safeDescription = sanitizeHtml(description, {
      allowedTags: [
        'b',
        'i',
        'u',
        'h1',
        'h2',
        'h3',
        'div',
        'ul',
        'ol',
        'li',
        'pre',
        'br',
      ],
    });
    if (await checkAdmin()) {
      const product = await sql<Product[]>`
        UPDATE products
        SET
          name = ${name},
          slug = ${slug},
          image = ${image},
          price = ${price},
          description = ${safeDescription}
        WHERE
          id = ${productId}
        RETURNING
          products.*
      `;
      return product[0];
    }
  },
);

/* Creates a product in the database with the values from the parameters.
Although the function name contains "Insecure" it is a secure function
because the query only gets executed when the user is logged in and has
the role "admin". It is named this way because otherwise ESLint shows an error. */
export const createProductInsecure = cache(
  async (
    name: string,
    slug: string,
    image: string,
    price: number,
    description: string,
  ) => {
    /* The values from "description" gets processed by sanitizeHTML
    to prevent XSS. */
    if (await checkAdmin()) {
      const safeDescription = sanitizeHtml(description, {
        allowedTags: [
          'b',
          'i',
          'u',
          'h1',
          'h2',
          'h3',
          'div',
          'ul',
          'ol',
          'li',
          'pre',
          'br',
        ],
      });
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
            ${safeDescription}
          )
        RETURNING
          products.*
      `;
      return product[0];
    }
  },
);

/* Deletes the product in the database where the id matches the parameter.
Although the function name contains "Insecure" it is a secure function
because the query only gets executed when the user is logged in and has
the role "admin". It is named this way because otherwise ESLint shows an error. */
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

/* Returns a product from the database where the name contains
the text from the parameter. */
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
