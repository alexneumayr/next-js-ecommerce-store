import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';
import { sql } from '../../../database/connect';

// eslint-disable-next-line no-restricted-syntax
export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    console.log({ username, password });

    const hashedPassword = await hash(password, 10);
    await sql`
      INSERT INTO
        users (username, password, role)
      VALUES
        (
          ${username},
          ${hashedPassword},
          'user'
        )
    `;
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ message: 'success' });
}
