import { NextResponse } from 'next/server';
import { z } from 'zod';
import type { Product } from '../../../database/products';
import {
  createProductInsecure,
  deleteProductInsecure,
  updateProductInsecure,
} from '../../../database/products';

type ResponseBodyProduct =
  | { product: Product }
  | { error: string; errorIssues?: { message: string }[] };

/* Defines the schema of the PUT request for the validation with zod */
const requestSchemaPUT = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  slug: z.string().min(1),
  image: z.string().url(),
  price: z.number().int().positive(),
  description: z.string().min(1),
});

/* Handles the PUT request: It validates the request first, then updates the product data in the database and returns the updated product on success. */
export async function PUT(
  request: Request,
): Promise<NextResponse<ResponseBodyProduct>> {
  const requestBody = await request.json();
  const result = requestSchemaPUT.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      {
        error:
          'Request does not contain the required data: id (number), name (string), slug (string), image(string/URL), price (number), description (string)',
        errorIssues: result.error.issues,
      },
      {
        status: 400,
      },
    );
  }
  const { id, name, slug, image, price, description } = result.data;
  const updatedProduct = await updateProductInsecure(
    id,
    name,
    slug,
    image,
    price,
    description,
  );
  if (updatedProduct) {
    return NextResponse.json({ product: updatedProduct });
  } else {
    return NextResponse.json(
      { error: 'Updating product failed' },
      { status: 500 },
    );
  }
}

/* Defines the schema of the POST request for the validation with zod */
const requestSchemaPOST = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  image: z.string().url(),
  price: z.number().int().positive(),
  description: z.string().min(1),
});

/* Handles the POST request: It validates the request first, then creates the product entry in the database and returns the created product on success. */
export async function POST(
  request: Request,
): Promise<NextResponse<ResponseBodyProduct>> {
  const requestBody = await request.json();
  const result = requestSchemaPOST.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      {
        error:
          'Request does not contain the required data: name (string), slug (string), image(string/URL), price (number), description (string)',
        errorIssues: result.error.issues,
      },
      {
        status: 400,
      },
    );
  }

  const { name, slug, image, price, description } = result.data;
  const createdProduct = await createProductInsecure(
    name,
    slug,
    image,
    price,
    description,
  );
  if (createdProduct) {
    return NextResponse.json({ product: createdProduct });
  } else {
    return NextResponse.json(
      { error: 'Creating product failed' },
      { status: 500 },
    );
  }
}

/* Defines the schema of the DELETE request for the validation with zod */
const requestSchemaDELETE = z.object({
  id: z.number().int().positive(),
});

/* Handles the DELETE request: It validates the request first, then deletes the product entry in the database and returns the deleted product on success. */
export async function DELETE(
  request: Request,
): Promise<NextResponse<ResponseBodyProduct>> {
  const requestBody = await request.json();
  const result = requestSchemaDELETE.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request does not contain the required data: id (number)',
        errorIssues: result.error.issues,
      },
      {
        status: 400,
      },
    );
  }

  const { id } = result.data;
  const deletedProduct = await deleteProductInsecure(id);
  if (deletedProduct) {
    return NextResponse.json({ product: deletedProduct });
  } else {
    return NextResponse.json(
      { error: 'Deleting product failed' },
      { status: 500 },
    );
  }
}
