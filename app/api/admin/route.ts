import { NextResponse } from 'next/server';
import { createProduct } from '../../database/products';

export async function PUT(request: Request) {
  const requestBody = await request.json();
  const { id, name, image, price } = requestBody;
  const updatedProduct = await updateProduct(id, name, image, price);
  if (updatedProduct) {
    return NextResponse.json(updatedProduct);
  } else {
    return NextResponse.json(
      { error: 'Updating product failed' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const requestBody = await request.json();
  const { name, image, price } = requestBody;
  const createdProduct = await createProduct(name, image, price);
  if (createdProduct) {
    return NextResponse.json(createdProduct);
  } else {
    return NextResponse.json(
      { error: 'Creating product failed' },
      { status: 500 },
    );
  }
}
