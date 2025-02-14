import { NextResponse } from 'next/server';
import type { Product } from '../../database/products';
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from '../../database/products';

type ResponseBodyProduct = Product | { error: string };

export async function PUT(
  request: Request,
): Promise<NextResponse<ResponseBodyProduct>> {
  const requestBody = await request.json();
  const { id, name, slug, image, price, description } = requestBody;
  const updatedProduct = await updateProduct(
    id,
    name,
    slug,
    image,
    price,
    description,
  );
  if (updatedProduct) {
    return NextResponse.json(updatedProduct);
  } else {
    return NextResponse.json(
      { error: 'Updating product failed' },
      { status: 500 },
    );
  }
}

export async function POST(
  request: Request,
): Promise<NextResponse<ResponseBodyProduct>> {
  const requestBody = await request.json();
  const { name, slug, image, price, description } = requestBody;
  const createdProduct = await createProduct(
    name,
    slug,
    image,
    price,
    description,
  );
  if (createdProduct) {
    return NextResponse.json(createdProduct);
  } else {
    return NextResponse.json(
      { error: 'Creating product failed' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
): Promise<NextResponse<ResponseBodyProduct>> {
  const requestBody = await request.json();
  const { id } = requestBody;
  const createdProduct = await deleteProduct(id);
  if (createdProduct) {
    return NextResponse.json(createdProduct);
  } else {
    return NextResponse.json(
      { error: 'Deleting product failed' },
      { status: 500 },
    );
  }
}
