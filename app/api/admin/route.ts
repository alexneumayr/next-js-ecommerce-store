import { NextResponse } from 'next/server';
import { z } from 'zod';
import type { Product } from '../../database/products';
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from '../../database/products';

type ResponseBodyProduct =
  | { product: Product }
  | { error: string; errorIssues?: { message: string }[] };

const requestSchemaPut = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  slug: z.string().min(1),
  image: z.string().url(),
  price: z.number().int().positive(),
  description: z.string().min(1),
});

export async function PUT(
  request: Request,
): Promise<NextResponse<ResponseBodyProduct>> {
  const requestBody = await request.json();
  const result = requestSchemaPut.safeParse(requestBody);

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
  const updatedProduct = await updateProduct(
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

const requestSchemaPost = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  image: z.string().url(),
  price: z.number().int().positive(),
  description: z.string().min(1),
});

export async function POST(
  request: Request,
): Promise<NextResponse<ResponseBodyProduct>> {
  const requestBody = await request.json();
  const result = requestSchemaPost.safeParse(requestBody);

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
  const createdProduct = await createProduct(
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

const requestSchemaDelete = z.object({
  id: z.number().int().positive(),
});

export async function DELETE(
  request: Request,
): Promise<NextResponse<ResponseBodyProduct>> {
  const requestBody = await request.json();
  const result = requestSchemaDelete.safeParse(requestBody);

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
  const createdProduct = await deleteProduct(id);
  if (createdProduct) {
    return NextResponse.json({ product: createdProduct });
  } else {
    return NextResponse.json(
      { error: 'Deleting product failed' },
      { status: 500 },
    );
  }
}
